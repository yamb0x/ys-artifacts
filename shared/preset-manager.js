// YS Artifacts - Universal Preset Manager
// Handles all preset operations across tools

import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js';
import {
    getFirestore,
    collection,
    doc,
    setDoc,
    getDoc,
    getDocs,
    deleteDoc,
    query,
    orderBy,
    limit,
    serverTimestamp
} from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB3UL04FPyYfRQRpcJVhnFaJUdCkb0sw3Y",
    authDomain: "ys-artifacts.firebaseapp.com",
    projectId: "ys-artifacts",
    storageBucket: "ys-artifacts.firebasestorage.app",
    messagingSenderId: "121710895247",
    appId: "1:121710895247:web:6036b0db6151bb8e7450fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Password for saving presets
const PRESET_PASSWORD = 'yambostudio';

// Cache management
const presetCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

class PresetManager {
    constructor(toolName) {
        this.toolName = toolName;
        this.currentPreset = null;
        this.onPresetLoad = null; // Callback when preset loads
        this.onPresetSave = null; // Callback when preset saves
        this.onError = null; // Error callback
    }

    // Initialize and load random preset on startup
    async initialize(applyPresetCallback) {
        this.onPresetLoad = applyPresetCallback;

        try {
            // Load all presets
            const presets = await this.getAllPresets();

            if (presets.length > 0) {
                // Select random preset
                const randomIndex = Math.floor(Math.random() * presets.length);
                const randomPreset = presets[randomIndex];

                // Apply the random preset
                if (this.onPresetLoad) {
                    this.onPresetLoad(randomPreset.parameters);
                    this.currentPreset = randomPreset;

                    // Show notification
                    this.showNotification(`Loaded preset: ${randomPreset.name}`, 'success');

                    // Update UI to show current preset
                    const presetSelect = document.getElementById('presetSelect');
                    if (presetSelect) {
                        presetSelect.value = randomPreset.id;
                    }
                }
            } else {
                console.log('No presets available for random selection');
            }
        } catch (error) {
            console.error('Error loading random preset:', error);
            // Don't show error on startup - just continue with defaults
        }
    }

    // Get all presets for this tool
    async getAllPresets(useCache = true) {
        const cacheKey = `presets_${this.toolName}`;

        // Check cache
        if (useCache && presetCache.has(cacheKey)) {
            const cached = presetCache.get(cacheKey);
            if (Date.now() - cached.timestamp < CACHE_DURATION) {
                return cached.data;
            }
        }

        try {
            const presetsRef = collection(db, 'presets', this.toolName, 'items');
            const q = query(presetsRef, orderBy('createdAt', 'desc'), limit(100));
            const querySnapshot = await getDocs(q);

            const presets = [];
            querySnapshot.forEach((doc) => {
                presets.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            // Update cache
            presetCache.set(cacheKey, {
                data: presets,
                timestamp: Date.now()
            });

            return presets;
        } catch (error) {
            console.error('Error fetching presets:', error);

            // Fallback to local storage
            const localPresets = this.getLocalPresets();
            return localPresets;
        }
    }

    // Save a new preset
    async savePreset(name, description, parameters, password) {
        // Validate password
        if (password !== PRESET_PASSWORD) {
            throw new Error('Invalid password. Please use the correct password to save presets.');
        }

        // Validate inputs
        if (!name || name.trim().length === 0) {
            throw new Error('Please provide a preset name');
        }

        // Generate unique ID
        const presetId = `preset_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        const presetData = {
            name: name.trim(),
            description: description || '',
            parameters: parameters,
            author: 'YS Studio',
            createdAt: serverTimestamp(),
            toolVersion: '1.0.0'
        };

        try {
            // Save to Firestore
            const presetRef = doc(db, 'presets', this.toolName, 'items', presetId);
            await setDoc(presetRef, presetData);

            // Clear cache
            presetCache.delete(`presets_${this.toolName}`);

            // Also save to local storage as backup
            this.saveToLocal(presetId, presetData);

            this.showNotification(`Preset "${name}" saved successfully!`, 'success');

            if (this.onPresetSave) {
                this.onPresetSave({ id: presetId, ...presetData });
            }

            return { id: presetId, ...presetData };
        } catch (error) {
            console.error('Error saving preset:', error);

            // Fallback to local storage only
            this.saveToLocal(presetId, presetData);
            this.showNotification('Saved to local storage (Firebase unavailable)', 'warning');

            return { id: presetId, ...presetData };
        }
    }

    // Load a specific preset
    async loadPreset(presetId) {
        try {
            const presetRef = doc(db, 'presets', this.toolName, 'items', presetId);
            const presetSnap = await getDoc(presetRef);

            if (presetSnap.exists()) {
                const preset = { id: presetSnap.id, ...presetSnap.data() };
                this.currentPreset = preset;

                if (this.onPresetLoad) {
                    this.onPresetLoad(preset.parameters);
                }

                this.showNotification(`Loaded preset: ${preset.name}`, 'success');
                return preset;
            } else {
                throw new Error('Preset not found');
            }
        } catch (error) {
            console.error('Error loading preset:', error);

            // Try local storage
            const localPreset = this.getLocalPreset(presetId);
            if (localPreset) {
                this.currentPreset = localPreset;
                if (this.onPresetLoad) {
                    this.onPresetLoad(localPreset.parameters);
                }
                this.showNotification(`Loaded preset from local: ${localPreset.name}`, 'success');
                return localPreset;
            }

            this.showNotification('Error loading preset', 'error');
            throw error;
        }
    }

    // Delete a preset
    async deletePreset(presetId, password) {
        // Validate password
        if (password !== PRESET_PASSWORD) {
            throw new Error('Invalid password');
        }

        try {
            await deleteDoc(doc(db, 'presets', this.toolName, 'items', presetId));

            // Clear cache
            presetCache.delete(`presets_${this.toolName}`);

            // Remove from local storage
            this.deleteFromLocal(presetId);

            this.showNotification('Preset deleted successfully', 'success');
            return true;
        } catch (error) {
            console.error('Error deleting preset:', error);
            this.showNotification('Error deleting preset', 'error');
            throw error;
        }
    }

    // Local storage fallback methods
    getLocalPresets() {
        const key = `ys_presets_${this.toolName}`;
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : [];
    }

    getLocalPreset(presetId) {
        const presets = this.getLocalPresets();
        return presets.find(p => p.id === presetId);
    }

    saveToLocal(presetId, presetData) {
        const presets = this.getLocalPresets();
        const newPreset = { id: presetId, ...presetData, createdAt: new Date().toISOString() };
        presets.unshift(newPreset);

        // Keep only last 50 presets in local storage
        if (presets.length > 50) {
            presets.length = 50;
        }

        localStorage.setItem(`ys_presets_${this.toolName}`, JSON.stringify(presets));
    }

    deleteFromLocal(presetId) {
        const presets = this.getLocalPresets();
        const filtered = presets.filter(p => p.id !== presetId);
        localStorage.setItem(`ys_presets_${this.toolName}`, JSON.stringify(filtered));
    }

    // UI Helper: Show notification
    showNotification(message, type = 'info') {
        // Check if notification element exists, if not create it
        let notification = document.getElementById('presetNotification');
        if (!notification) {
            notification = document.createElement('div');
            notification.id = 'presetNotification';
            notification.style.cssText = `
                position: fixed;
                top: 80px;
                right: 20px;
                padding: 12px 20px;
                background: ${type === 'success' ? '#00FF00' : type === 'error' ? '#FF0000' : type === 'warning' ? '#FFB700' : '#000'};
                color: ${type === 'success' ? '#000' : '#FFF'};
                font-size: 12px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                border: 1px solid #000;
                z-index: 10000;
                transition: opacity 0.3s ease;
            `;
            document.body.appendChild(notification);
        }

        notification.textContent = message;
        notification.style.background = type === 'success' ? '#00FF00' :
                                       type === 'error' ? '#FF0000' :
                                       type === 'warning' ? '#FFB700' : '#000';
        notification.style.color = type === 'success' ? '#000' : '#FFF';
        notification.style.opacity = '1';
        notification.style.display = 'block';

        // Auto hide after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.style.display = 'none';
            }, 300);
        }, 3000);
    }

    // Export current parameters as JSON
    exportPreset(parameters) {
        const preset = {
            tool: this.toolName,
            name: this.currentPreset?.name || 'Exported Preset',
            parameters: parameters,
            exportDate: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(preset, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.toolName}_preset_${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    // Import preset from JSON
    async importPreset(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const preset = JSON.parse(e.target.result);

                    if (preset.tool !== this.toolName) {
                        throw new Error(`This preset is for ${preset.tool}, not ${this.toolName}`);
                    }

                    if (this.onPresetLoad) {
                        this.onPresetLoad(preset.parameters);
                    }

                    this.showNotification('Preset imported successfully', 'success');
                    resolve(preset);
                } catch (error) {
                    this.showNotification('Error importing preset', 'error');
                    reject(error);
                }
            };
            reader.readAsText(file);
        });
    }
}

// Export for use in tools
export { PresetManager };