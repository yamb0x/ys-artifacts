// YS Artifacts - Preset UI Component
// Creates and manages the preset UI for any tool

class PresetUIComponent {
    constructor(presetManager, extractParamsCallback) {
        this.presetManager = presetManager;
        this.extractParams = extractParamsCallback;
        this.container = null;
    }

    // Create and inject the preset UI into the page
    create(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Container with id "${containerId}" not found`);
            return;
        }

        // Create preset section HTML
        const presetHTML = `
            <div class="preset-section">
                <div class="preset-controls">
                    <div class="preset-row preset-select-row">
                        <select id="presetSelect" class="preset-select">
                            <option value="">Select preset...</option>
                        </select>
                        <button id="loadPresetBtn" class="preset-btn-icon" title="Load/Refresh">↻</button>
                    </div>
                    <div class="preset-row">
                        <button id="savePresetBtn" class="preset-btn">Save</button>
                        <button id="deletePresetBtn" class="preset-btn">Delete</button>
                    </div>
                    <div class="preset-row">
                        <button id="exportPresetBtn" class="preset-btn-secondary">Export</button>
                        <input type="file" id="importPresetInput" accept=".json" style="display: none;">
                        <button id="importPresetBtn" class="preset-btn-secondary">Import</button>
                    </div>
                    <div id="currentPresetDisplay" class="current-preset-display" style="display: none;">
                        <span class="current-preset-name"></span>
                    </div>
                </div>
            </div>
        `;

        // Create save modal HTML
        const modalHTML = `
            <div id="presetSaveModal" class="preset-modal">
                <div class="preset-modal-content">
                    <button class="preset-modal-close" onclick="this.parentElement.parentElement.classList.remove('active')">×</button>
                    <div class="preset-modal-header">Save New Preset</div>
                    <div class="preset-modal-body">
                        <div class="preset-input-group">
                            <label class="preset-input-label">Password</label>
                            <input type="password" id="presetPassword" class="preset-input" placeholder="Enter password to save">
                        </div>
                        <div class="preset-input-group">
                            <label class="preset-input-label">Preset Name</label>
                            <input type="text" id="presetName" class="preset-input" placeholder="My Amazing Preset">
                        </div>
                        <div class="preset-input-group">
                            <label class="preset-input-label">Description (optional)</label>
                            <textarea id="presetDescription" class="preset-textarea" placeholder="Describe this preset..."></textarea>
                        </div>
                    </div>
                    <div class="preset-modal-footer">
                        <button class="preset-modal-btn cancel" onclick="document.getElementById('presetSaveModal').classList.remove('active')">Cancel</button>
                        <button id="confirmSaveBtn" class="preset-modal-btn confirm">Save Preset</button>
                    </div>
                </div>
            </div>
        `;

        // Create delete confirmation modal
        const deleteModalHTML = `
            <div id="presetDeleteModal" class="preset-modal">
                <div class="preset-modal-content">
                    <button class="preset-modal-close" onclick="this.parentElement.parentElement.classList.remove('active')">×</button>
                    <div class="preset-modal-header">Delete Preset</div>
                    <div class="preset-modal-body">
                        <p style="margin-bottom: 16px; font-size: 13px;">Are you sure you want to delete this preset?</p>
                        <div class="preset-input-group">
                            <label class="preset-input-label">Password</label>
                            <input type="password" id="deletePassword" class="preset-input" placeholder="Enter password to delete">
                        </div>
                    </div>
                    <div class="preset-modal-footer">
                        <button class="preset-modal-btn cancel" onclick="document.getElementById('presetDeleteModal').classList.remove('active')">Cancel</button>
                        <button id="confirmDeleteBtn" class="preset-modal-btn confirm" style="background: var(--ys-red, #FF0000);">Delete</button>
                    </div>
                </div>
            </div>
        `;

        // Insert HTML
        this.container.innerHTML = presetHTML;

        // Add modals to body if they don't exist
        if (!document.getElementById('presetSaveModal')) {
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        }
        if (!document.getElementById('presetDeleteModal')) {
            document.body.insertAdjacentHTML('beforeend', deleteModalHTML);
        }

        // Attach event listeners
        this.attachEventListeners();

        // Load presets into dropdown
        this.loadPresetList();
    }

    // Attach all event listeners
    attachEventListeners() {
        // Load/Refresh preset button - dual function
        document.getElementById('loadPresetBtn')?.addEventListener('click', () => {
            const select = document.getElementById('presetSelect');
            if (select?.value) {
                // If a preset is selected, load it
                this.loadSelectedPreset();
            } else {
                // If no preset selected, refresh the list
                this.loadPresetList(false);
            }
        });

        // Preset select change
        document.getElementById('presetSelect')?.addEventListener('change', (e) => {
            if (e.target.value) {
                // Auto-load on selection
                this.loadSelectedPreset();
            }
        });

        // Save preset button
        document.getElementById('savePresetBtn')?.addEventListener('click', () => {
            this.showSaveModal();
        });

        // Confirm save button
        document.getElementById('confirmSaveBtn')?.addEventListener('click', () => {
            this.savePreset();
        });

        // Delete preset button
        document.getElementById('deletePresetBtn')?.addEventListener('click', () => {
            this.showDeleteModal();
        });

        // Confirm delete button
        document.getElementById('confirmDeleteBtn')?.addEventListener('click', () => {
            this.deletePreset();
        });

        // Export preset button
        document.getElementById('exportPresetBtn')?.addEventListener('click', () => {
            const params = this.extractParams();
            this.presetManager.exportPreset(params);
        });

        // Import preset button
        document.getElementById('importPresetBtn')?.addEventListener('click', () => {
            document.getElementById('importPresetInput').click();
        });

        // Import file input
        document.getElementById('importPresetInput')?.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.presetManager.importPreset(file);
                e.target.value = ''; // Reset input
            }
        });

        // Close modals on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.preset-modal.active').forEach(modal => {
                    modal.classList.remove('active');
                });
            }
        });

        // Enter key to save in save modal
        document.getElementById('presetName')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.savePreset();
            }
        });
    }

    // Load presets into dropdown
    async loadPresetList(useCache = true) {
        const select = document.getElementById('presetSelect');
        if (!select) return;

        // Show loading state
        select.disabled = true;
        select.innerHTML = '<option value="">Loading presets...</option>';

        try {
            const presets = await this.presetManager.getAllPresets(useCache);

            // Clear and populate dropdown
            select.innerHTML = '<option value="">Select preset...</option>';

            if (presets.length === 0) {
                select.innerHTML += '<option value="" disabled>No presets available</option>';
            } else {
                presets.forEach(preset => {
                    const option = document.createElement('option');
                    option.value = preset.id;
                    option.textContent = preset.name;
                    if (preset.description) {
                        option.title = preset.description;
                    }
                    select.appendChild(option);
                });
            }

            // If there's a current preset, select it
            if (this.presetManager.currentPreset) {
                select.value = this.presetManager.currentPreset.id;
                this.updateCurrentPresetDisplay(this.presetManager.currentPreset.name);
            }

        } catch (error) {
            console.error('Error loading presets:', error);
            select.innerHTML = '<option value="">Error loading presets</option>';
        } finally {
            select.disabled = false;
        }
    }

    // Load the selected preset
    async loadSelectedPreset() {
        const select = document.getElementById('presetSelect');
        const presetId = select?.value;

        if (!presetId) {
            this.presetManager.showNotification('Please select a preset to load', 'warning');
            return;
        }

        try {
            const preset = await this.presetManager.loadPreset(presetId);
            this.updateCurrentPresetDisplay(preset.name);
        } catch (error) {
            console.error('Error loading preset:', error);
            this.presetManager.showNotification('Error loading preset', 'error');
        }
    }

    // Show save modal
    showSaveModal() {
        const modal = document.getElementById('presetSaveModal');
        if (modal) {
            modal.classList.add('active');
            document.getElementById('presetPassword').value = '';
            document.getElementById('presetName').value = '';
            document.getElementById('presetDescription').value = '';
            document.getElementById('presetPassword').focus();
        }
    }

    // Save preset
    async savePreset() {
        const password = document.getElementById('presetPassword')?.value;
        const name = document.getElementById('presetName')?.value;
        const description = document.getElementById('presetDescription')?.value;

        if (!password || !name) {
            this.presetManager.showNotification('Please fill in all required fields', 'warning');
            return;
        }

        try {
            // Get current parameters from the tool
            const parameters = this.extractParams();

            // Save preset
            const preset = await this.presetManager.savePreset(name, description, parameters, password);

            // Close modal
            document.getElementById('presetSaveModal')?.classList.remove('active');

            // Refresh preset list
            await this.loadPresetList(false);

            // Select the new preset
            const select = document.getElementById('presetSelect');
            if (select) {
                select.value = preset.id;
            }

            this.updateCurrentPresetDisplay(preset.name);

        } catch (error) {
            console.error('Error saving preset:', error);
            this.presetManager.showNotification(error.message || 'Error saving preset', 'error');
        }
    }

    // Show delete modal
    showDeleteModal() {
        const select = document.getElementById('presetSelect');
        const presetId = select?.value;

        if (!presetId) {
            this.presetManager.showNotification('Please select a preset to delete', 'warning');
            return;
        }

        const modal = document.getElementById('presetDeleteModal');
        if (modal) {
            modal.classList.add('active');
            document.getElementById('deletePassword').value = '';
            document.getElementById('deletePassword').focus();
        }
    }

    // Delete preset
    async deletePreset() {
        const select = document.getElementById('presetSelect');
        const presetId = select?.value;
        const password = document.getElementById('deletePassword')?.value;

        if (!presetId || !password) {
            this.presetManager.showNotification('Please enter the password', 'warning');
            return;
        }

        try {
            await this.presetManager.deletePreset(presetId, password);

            // Close modal
            document.getElementById('presetDeleteModal')?.classList.remove('active');

            // Refresh preset list
            await this.loadPresetList(false);

            // Clear current preset display
            this.updateCurrentPresetDisplay(null);

        } catch (error) {
            console.error('Error deleting preset:', error);
            this.presetManager.showNotification(error.message || 'Error deleting preset', 'error');
        }
    }

    // Update current preset display
    updateCurrentPresetDisplay(presetName) {
        const display = document.getElementById('currentPresetDisplay');
        const nameSpan = display?.querySelector('.current-preset-name');

        if (display && nameSpan) {
            if (presetName) {
                nameSpan.textContent = presetName;
                display.style.display = 'block';
            } else {
                display.style.display = 'none';
            }
        }
    }
}

// Export for use in tools
export { PresetUIComponent };