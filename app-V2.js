// 🔥 Force-clear stored data on every page load
localStorage.clear();
sessionStorage.clear();

// Optional: clear all form fields after DOM is ready
window.addEventListener('DOMContentLoaded', function() {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => form.reset());
});

// Islamic Matrimonial Profile Builder - JavaScript

// Application Data
const quranVerses = [
    {
        id: 1,
        arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
        english: "And of His signs is that He created for you from yourselves mates that you may find tranquility in them, and He placed between you affection and mercy",
        reference: "Quran 30:21",
        template: "classic"
    },
    {
        id: 2,
        arabic: "هُنَّ لِبَاسٌ لَّكُمْ وَأَنتُمْ لِبَاسٌ لَّهُنَّ",
        english: "They are clothing for you and you are clothing for them",
        reference: "Quran 2:187",
        template: "royal"
    },
    {
        id: 3,
        arabic: "يَا أَيُّهَا النَّاسُ اتَّقُوا رَبَّكُمُ الَّذِي خَلَقَكُم مِّن نَّفْسٍ وَاحِدَةٍ",
        english: "O mankind, fear your Lord, who created you from one soul",
        reference: "Quran 4:1",
        template: "modern"
    },
    {
        id: 4,
        arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَاتِنَا قُرَّةَ أَعْيُنٍ",
        english: "Our Lord, grant us from among our wives and offspring comfort to our eyes",
        reference: "Quran 25:74",
        template: "traditional"
    },
    {
        id: 5,
        arabic: "وَأَنكِحُوا الْأَيَامَىٰ مِنكُمْ وَالصَّالِحِينَ مِنْ عِبَادِكُمْ وَإِمَائِكُمْ",
        english: "And marry the unmarried among you and the righteous among your male and female servants",
        reference: "Quran 24:32",
        template: "peaceful"
    },
    {
        id: 6,
        arabic: "النِّكَاحُ مِنْ سُنَّتِي فَمَنْ لَمْ يَعْمَلْ بِسُنَّتِي فَلَيْسَ مِنِّي",
        english: "Marriage is part of my sunnah, and whoever does not follow my sunnah has nothing to do with me",
        reference: "Hadith - Sunan Ibn Majah",
        template: "divine"
    }
];

const templates = [
    {
        id: "classic",
        name: "Classic Elegance",
        description: "Green and gold color scheme with geometric borders",
        colors: ["#2E8B57", "#FFD700", "#F5F5DC"],
        verseId: 1
    },
    {
        id: "royal", 
        name: "Royal Heritage",
        description: "Deep blue and gold with mosque silhouette design",
        colors: ["#191970", "#FFD700", "#F8F8FF"],
        verseId: 2
    },
    {
        id: "modern",
        name: "Modern Faith", 
        description: "Contemporary design with subtle Islamic patterns",
        colors: ["#4682B4", "#20B2AA", "#F0F8FF"],
        verseId: 3
    },
    {
        id: "traditional",
        name: "Traditional Charm",
        description: "Ornate arabesque patterns in warm colors", 
        colors: ["#CD853F", "#DAA520", "#FFF8DC"],
        verseId: 4
    },
    {
        id: "peaceful",
        name: "Peaceful Harmony",
        description: "Soft pastels with crescent moon and star motifs",
        colors: ["#E6E6FA", "#9370DB", "#F5F5F5"],
        verseId: 5
    },
    {
        id: "divine",
        name: "Divine Blessing",
        description: "Rich burgundy and gold with calligraphy elements",
        colors: ["#8B0000", "#FFD700", "#FFF5EE"],
        verseId: 6
    }
];

// Application State
let currentSection = 'welcome';
let selectedTemplate = 'classic';
let formData = {};

// Initialize Application
(function() {
    console.log('Script loaded, setting up immediate initialization...');
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
        initializeApp();
    }
})();

function initializeApp() {
    console.log('Initializing app...');
    
    // Set up global functions first
    setupGlobalFunctions();
    
    // Initialize the welcome section
    switchToSection('welcome');
    
    // Set up all event listeners
    setupAllEventListeners();
    
    // Initialize photo upload functionality
    initializePhotoUpload();
    
    // Generate initial content
    generateTemplates();
    
    // Load any saved data
    loadSavedData();
    
    // Update progress
    updateProgress();
    
    console.log('App initialized successfully');
}

function setupGlobalFunctions() {
    // Define all functions globally
    window.startProfile = startProfile;
    window.switchToSection = switchToSection;
    window.selectTemplate = selectTemplate;
    window.changePhoto = changePhoto;
    window.saveProgress = saveProgress;
    window.downloadPDF = downloadPDF;
    
    console.log('Global functions set up');
}

// Photo Upload Functionality - CRITICAL IMPLEMENTATION
function initializePhotoUpload() {
    console.log('Initializing photo upload...');
    
    const photoInput = document.getElementById('photoInput');
    const photoUploadArea = document.getElementById('photoUploadArea');
    const selectPhotoBtn = document.getElementById('selectPhotoBtn');
    const removePhotoBtn = document.getElementById('removePhotoBtn');
    const previewImage = document.getElementById('previewImage');
    const photoPlaceholder = document.getElementById('photoPlaceholder');

    if (!photoInput || !photoUploadArea || !selectPhotoBtn || !removePhotoBtn || !previewImage || !photoPlaceholder) {
        console.error('Photo upload elements not found');
        return;
    }

    // File input change handler
    photoInput.addEventListener('change', handlePhotoSelect);
    
    // Button click handlers
    selectPhotoBtn.addEventListener('click', () => photoInput.click());
    removePhotoBtn.addEventListener('click', removePhoto);
    
    // Drag and drop handlers
    photoUploadArea.addEventListener('dragover', handleDragOver);
    photoUploadArea.addEventListener('drop', handlePhotoDrop);
    photoUploadArea.addEventListener('click', (e) => {
        // Only trigger if clicking on the upload area itself, not buttons
        if (e.target === photoUploadArea || e.target === photoPlaceholder || e.target.closest('.photo-placeholder')) {
            photoInput.click();
        }
    });

    function handlePhotoSelect(event) {
        console.log('Photo input changed');
        const file = event.target.files[0];
        if (file) {
            processPhotoFile(file);
        }
    }

    function handlePhotoDrop(event) {
        console.log('Photo dropped');
        event.preventDefault();
        photoUploadArea.classList.remove('dragover');
        const file = event.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            processPhotoFile(file);
        }
    }

    function handleDragOver(event) {
        event.preventDefault();
        photoUploadArea.classList.add('dragover');
    }

    function processPhotoFile(file) {
        console.log('Processing photo file:', file.name, file.type, file.size);
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
            showMessage('Please select a valid image file', 'error');
            return;
        }

        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
            showMessage('File size must be less than 5MB', 'error');
            return;
        }

        // Use FileReader to read and preview image
        const reader = new FileReader();
        reader.onload = function(e) {
            console.log('FileReader loaded successfully');
            previewImage.src = e.target.result;
            previewImage.style.display = 'block';
            photoPlaceholder.style.display = 'none';
            selectPhotoBtn.textContent = 'Change Photo';
            removePhotoBtn.style.display = 'inline-block';
            
            // Store photo data for saving
            formData.photo = e.target.result;
            updateProgress();
            showMessage('Photo uploaded successfully', 'success');
            
            // Save to localStorage
            try {
                localStorage.setItem('uploadedPhoto', e.target.result);
            } catch (err) {
                console.warn('Could not save photo to localStorage:', err);
            }
        };
        reader.onerror = function() {
            console.error('Error reading photo file');
            showMessage('Error reading photo file', 'error');
        };
        reader.readAsDataURL(file);
    }

    function removePhoto() {
        console.log('Removing photo');
        previewImage.src = '';
        previewImage.style.display = 'none';
        photoPlaceholder.style.display = 'block';
        selectPhotoBtn.textContent = 'Select Photo';
        removePhotoBtn.style.display = 'none';
        photoInput.value = '';
        formData.photo = null;
        updateProgress();
        showMessage('Photo removed', 'info');
        
        // Remove from localStorage
        try {
            localStorage.removeItem('uploadedPhoto');
        } catch (e) {
            console.warn('Could not remove photo from localStorage:', e);
        }
    }
    
    console.log('Photo upload initialized successfully');
}

function startProfile() {
    console.log('Starting profile creation...');
    switchToSection('form');
}

function switchToSection(sectionName) {
    console.log('Switching to section:', sectionName);
    
    // Hide all sections
    const sections = ['welcome', 'form', 'photo', 'templates', 'preview'];
    sections.forEach(name => {
        const section = document.getElementById(name + 'Section');
        if (section) {
            section.classList.remove('active');
            section.style.display = 'none';
        }
    });

    // Show target section
    const targetSection = document.getElementById(sectionName + 'Section');
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.style.display = 'block';
        console.log('Section shown:', sectionName);
    } else {
        console.error('Section not found:', sectionName + 'Section');
        return;
    }

    // Update navigation tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });

    const activeTab = document.querySelector(`[data-section="${sectionName}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }

    // Show/hide navigation
    const navigation = document.getElementById('navigation');
    if (navigation) {
        navigation.style.display = sectionName === 'welcome' ? 'none' : 'block';
    }

    currentSection = sectionName;

    // Special actions for certain sections
    if (sectionName === 'preview') {
        generatePreview();
    } else if (sectionName === 'templates') {
        generateTemplates();
    }

    // Save current section
    try {
        localStorage.setItem('currentSection', sectionName);
    } catch (e) {
        console.warn('Could not save to localStorage:', e);
    }
}

function selectTemplate(templateId) {
    console.log('Selecting template:', templateId);
    selectedTemplate = templateId;
    
    // Update template selection UI
    document.querySelectorAll('.template-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Find and select the correct template card
    const templateCards = document.querySelectorAll('.template-card');
    const templateIndex = templates.findIndex(t => t.id === templateId);
    if (templateIndex >= 0 && templateCards[templateIndex]) {
        templateCards[templateIndex].classList.add('selected');
    }
    
    // Save selection
    try {
        localStorage.setItem('selectedTemplate', templateId);
    } catch (e) {
        console.warn('Could not save template to localStorage:', e);
    }
    
    // Update preview if in preview section
    if (currentSection === 'preview') {
        generatePreview();
    }
}

function changePhoto() {
    console.log('Change photo clicked');
    const previewImage = document.getElementById('previewImage');
    const photoPlaceholder = document.getElementById('photoPlaceholder');
    const selectPhotoBtn = document.getElementById('selectPhotoBtn');
    const removePhotoBtn = document.getElementById('removePhotoBtn');
    
    if (previewImage && photoPlaceholder && selectPhotoBtn && removePhotoBtn) {
        previewImage.style.display = 'none';
        photoPlaceholder.style.display = 'block';
        selectPhotoBtn.textContent = 'Select Photo';
        removePhotoBtn.style.display = 'none';
    }
    
    formData.photo = null;
    try {
        localStorage.removeItem('uploadedPhoto');
    } catch (e) {
        console.warn('Could not remove photo from localStorage:', e);
    }
    updateProgress();
}

function saveProgress() {
    console.log('Save progress called');
    
    try {
        // Collect current form data
        collectFormData();
        
        // Save to localStorage
        localStorage.setItem('matrimonialFormData', JSON.stringify(formData));
        localStorage.setItem('selectedTemplate', selectedTemplate);
        localStorage.setItem('currentSection', currentSection);
        
        console.log('Progress saved successfully');
        showMessage('Progress saved successfully! ✓', 'success');
        
    } catch (error) {
        console.error('Error saving progress:', error);
        showMessage('Could not save progress. Please try again.', 'error');
    }
}

let isPrinting = false; // prevents multiple triggers

function generatePDF() {  // Replace with your actual function name
    const { jsPDF } = window.jspdf;  // Assuming jsPDF is loaded via CDN
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    
    // Your existing PDF content generation code here (e.g., doc.text(), doc.addImage(), etc.)
    // Example: doc.text('Your profile content', 10, 10);
    
    // Generate the PDF as a blob (this avoids data URL issues)
    const pdfBlob = doc.output('blob');
    
    // Create a temporary download link
    const downloadUrl = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'Matrimonial_Profile.pdf';  // Customize filename as needed
    link.target = '_blank';  // Ensures it opens in a new tab if needed, but focuses on download
    
    // Trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL to prevent memory leaks
    URL.revokeObjectURL(downloadUrl);
}
// Helper: generate preview and print once
function generatePreviewSafely() {
    try {
        generatePreview();
        // small delay to ensure the DOM renders fully
        setTimeout(() => {
            window.print();
        }, 500);
    } catch (e) {
        console.error('Error generating preview:', e);
    }
}


function setupAllEventListeners() {
    console.log('Setting up all event listeners...');
    
    // Use event delegation for all clicks
    document.addEventListener('click', function(e) {
        console.log('Click detected on:', e.target.tagName, e.target.className);
        
        // Handle navigation tabs
        const navTab = e.target.closest('.nav-tab');
        if (navTab) {
            e.preventDefault();
            e.stopPropagation();
            const section = navTab.getAttribute('data-section');
            if (section) {
                console.log('Navigation tab clicked:', section);
                switchToSection(section);
            }
            return;
        }
        
        // Handle template card clicks
        const templateCard = e.target.closest('.template-card');
        if (templateCard) {
            e.preventDefault();
            e.stopPropagation();
            const templateIndex = Array.from(templateCard.parentNode.children).indexOf(templateCard);
            if (templates[templateIndex]) {
                selectTemplate(templates[templateIndex].id);
            }
            return;
        }
        
        // Handle specific button clicks by checking onclick attribute or text content
        if (e.target.tagName === 'BUTTON') {
            const buttonText = e.target.textContent.trim();
            const onclickAttr = e.target.getAttribute('onclick');
            
            console.log('Button clicked:', buttonText, onclickAttr);
            
            if (buttonText === 'Start Creating Profile' || onclickAttr === 'startProfile()') {
                e.preventDefault();
                e.stopPropagation();
                startProfile();
                return;
            }
            
            if (buttonText === 'Save Progress' || onclickAttr === 'saveProgress()') {
                e.preventDefault();
                e.stopPropagation();
                saveProgress();
                return;
            }
            
            if (buttonText === 'Download as PDF' || onclickAttr === 'downloadPDF()') {
                e.preventDefault();
                e.stopPropagation();
                downloadPDF();
                return;
            }
            
            if (buttonText === 'Change Photo' || onclickAttr === 'changePhoto()') {
                e.preventDefault();
                e.stopPropagation();
                changePhoto();
                return;
            }
            
            // Handle section navigation buttons
            if (onclickAttr && onclickAttr.includes('switchToSection')) {
                e.preventDefault();
                e.stopPropagation();
                const match = onclickAttr.match(/switchToSection\('([^']+)'\)/);
                if (match) {
                    switchToSection(match[1]);
                }
                return;
            }
        }
    });

    // Form handling
    const form = document.getElementById('matrimonialForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
        });
        
        form.addEventListener('input', function(e) {
            handleFormInput(e);
        });
        
        form.addEventListener('change', function(e) {
            handleFormInput(e);
        });
        
        console.log('Form event listeners attached');
    }
    
    console.log('All event listeners set up');
}

function collectFormData() {
    const form = document.getElementById('matrimonialForm');
    if (!form) return;
    
    // Reset formData but preserve photo
    const photo = formData.photo;
    formData = {};
    if (photo) {
        formData.photo = photo;
    }
    
    // Get all form elements
    const formElements = form.querySelectorAll('input, select, textarea');
    
    formElements.forEach(element => {
        if (!element.name) return;
        
        if (element.type === 'checkbox') {
            if (!formData[element.name]) {
                formData[element.name] = [];
            }
            if (element.checked) {
                formData[element.name].push(element.value);
            }
        } else if (element.type === 'radio') {
            if (element.checked) {
                formData[element.name] = element.value;
            }
        } else {
            formData[element.name] = element.value;
        }
    });
    
    // Auto-calculate age from date of birth
    if (formData.dateOfBirth) {
        const birthDate = new Date(formData.dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        formData.age = age;
    }
    
    console.log('Form data collected:', formData);
}

function handleFormInput(e) {
    console.log('Form input changed:', e.target.name, e.target.value);
    
    // Collect all form data
    collectFormData();
    updateProgress();
    
    // Auto-save after a delay
    clearTimeout(window.autoSaveTimeout);
    window.autoSaveTimeout = setTimeout(() => {
        try {
            localStorage.setItem('matrimonialFormData', JSON.stringify(formData));
        } catch (e) {
            console.warn('Could not auto-save form data:', e);
        }
    }, 1000);
}

function generateTemplates() {
    const templatesGrid = document.getElementById('templatesGrid');
    if (!templatesGrid) {
        console.warn('Templates grid not found');
        return;
    }

    templatesGrid.innerHTML = '';

    templates.forEach((template, index) => {
        const verse = quranVerses.find(v => v.id === template.verseId);
        
        const templateCard = document.createElement('div');
        templateCard.className = `template-card ${template.id === selectedTemplate ? 'selected' : ''}`;

        templateCard.innerHTML = `
            <div class="template-preview template-${template.id}">
                <div class="template-content">
                    <div class="template-verse">${verse ? verse.english : 'Verse not found'}</div>
                    <div class="template-verse-reference">${verse ? verse.reference : ''}</div>
                </div>
            </div>
            <div class="template-info">
                <div class="template-name">${template.name}</div>
                <div class="template-description">${template.description}</div>
            </div>
        `;

        templatesGrid.appendChild(templateCard);
    });
    
    console.log('Templates generated:', templates.length);
}

function generatePreview() {
    console.log('Generating preview...');
    
    const previewContainer = document.getElementById('biodataPreview');
    if (!previewContainer) {
        console.warn('Preview container not found');
        return;
    }

    // Ensure we have current form data
    collectFormData();

    const template = templates.find(t => t.id === selectedTemplate);
    const verse = quranVerses.find(v => v.id === template.verseId);

    const biodata = createBiodataHTML(template, verse);
    previewContainer.innerHTML = biodata;
    
    console.log('Preview generated successfully');
}

function createBiodataHTML(template, verse) {
    const fullName = formData.fullName || 'Your Name';
    const photoSrc = formData.photo || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDIwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyNTAiIGZpbGw9IiNmNWY1ZjUiLz48dGV4dCB4PSIxMDAiIHk9IjEzMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzk5OTk5OSIgZm9udC1zaXplPSIxNiI+UGhvdG88L3RleHQ+PC9zdmc+';

    return `
        <div class="biodata template-${template.id}" style="background: ${template.colors[2]}; color: ${template.colors[1] === '#d9c812ff' ? '#333' : template.colors[0]};">
            <div class="biodata-header">
                <div class="biodata-decoration">☪️</div>
                <h1 class="biodata-title" style="color: ${template.colors[0]};">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</h1>
                <h2 style="color: ${template.colors[0]}; margin-bottom: 16px;">Matrimonial Profile</h2>
                
                <div class="biodata-verse" style="background: ${template.colors[0]}20; border-left: 4px solid ${template.colors[0]};">
                    <div class="biodata-verse-arabic" style="color: ${template.colors[0]};">${verse.arabic}</div>
                    <div class="biodata-verse-english" style="color: ${template.colors[1] === '#d8cb19c4' ? '#555' : template.colors[0]};">${verse.english}</div>
                    <div class="biodata-verse-reference" style="color: ${template.colors[1] === '#e1e412ff' ? '#777' : template.colors[0]};">— ${verse.reference}</div>
                </div>
            </div>

            <div class="biodata-content">
                <div class="biodata-photo">
                    <img src="${photoSrc}" alt="Profile Photo" style="border-color: ${template.colors[0]};">
                    <h3 style="color: ${template.colors[0]}; margin-bottom: 8px;">${fullName}</h3>
                    ${formData.age ? `<p style="color: ${template.colors[1] === '#dede10ff' ? '#666' : template.colors[0]}; opacity: 0.8;">Age: ${formData.age} years</p>` : ''}
                </div>

                <div class="biodata-details">
                    ${generatePersonalDetailsSection(template)}
                    ${generateReligiousSection(template)}
                    ${generateEducationSection(template)}
                    ${generateProfessionalSection(template)}
                    ${generateFamilySection(template)}
                    ${generateLifestyleSection(template)}
                    ${generatePartnerPreferencesSection(template)}
                    ${generateContactSection(template)}
                </div>
            </div>
        </div>
    `;
}

// Section generation functions
function generatePersonalDetailsSection(template) {
    const details = [
        { label: 'Date of Birth', value: formData.dateOfBirth ? new Date(formData.dateOfBirth).toLocaleDateString() : '' },
        { label: 'Gender', value: formData.gender ? formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1) : '' },
        { label: 'Height', value: formData.height },
        { label: 'Blood Group', value: formData.bloodGroup },
        { label: 'Complexion', value: formData.complexion ? formData.complexion.charAt(0).toUpperCase() + formData.complexion.slice(1) : '' },
        { label: 'Marital Status', value: formData.maritalStatus ? formData.maritalStatus.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) : '' }
    ].filter(item => item.value);

    if (details.length === 0) return '';

    return `
        <div class="detail-section">
            <h4 style="color: ${template.colors[0]};">Personal Details</h4>
            <div class="detail-grid">
                ${details.map(detail => `
                    <div class="detail-item">
                        <span class="detail-label">${detail.label}:</span>
                        <span class="detail-value">${detail.value}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function generateReligiousSection(template) {
    const practices = Array.isArray(formData.religiousPractices) ? 
        formData.religiousPractices.map(p => p.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())).join(', ') : '';

    const details = [
        { label: 'Religion', value: formData.religion || 'Islam' },
        { label: 'Sect', value: formData.sect ? formData.sect.charAt(0).toUpperCase() + formData.sect.slice(1) : '' },
        { label: 'Religious Practices', value: practices, full: true },
        { label: 'Mosque Involvement', value: formData.mosqueInvolvement, full: true }
    ].filter(item => item.value);

    if (details.length === 0) return '';

    return `
        <div class="detail-section">
            <h4 style="color: ${template.colors[0]};">Religious Information</h4>
            ${details.map(detail => `
                <div class="detail-item ${detail.full ? 'detail-full' : ''}">
                    <span class="detail-label">${detail.label}:</span>
                    <span class="detail-value">${detail.value}</span>
                </div>
            `).join('')}
        </div>
    `;
}

function generateEducationSection(template) {
    const details = [
        { label: 'Education', value: formData.highestEducation ? formData.highestEducation.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) : '' },
        { label: 'Institution', value: formData.institutionName },
        { label: 'Field of Study', value: formData.fieldOfStudy },
        { label: 'Additional Qualifications', value: formData.additionalQualifications, full: true }
    ].filter(item => item.value);

    if (details.length === 0) return '';

    return `
        <div class="detail-section">
            <h4 style="color: ${template.colors[0]};">Educational Background</h4>
            ${details.map(detail => `
                <div class="detail-item ${detail.full ? 'detail-full' : ''}">
                    <span class="detail-label">${detail.label}:</span>
                    <span class="detail-value">${detail.value}</span>
                </div>
            `).join('')}
        </div>
    `;
}

function generateProfessionalSection(template) {
    const details = [
        { label: 'Occupation', value: formData.occupation },
        { label: 'Company', value: formData.company },
        { label: 'Job Title', value: formData.jobTitle },
        { label: 'Annual Income', value: formData.annualIncome ? formData.annualIncome.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) : '' },
        { label: 'Work Location', value: formData.workLocation }
    ].filter(item => item.value);

    if (details.length === 0) return '';

    return `
        <div class="detail-section">
            <h4 style="color: ${template.colors[0]};">Professional Details</h4>
            <div class="detail-grid">
                ${details.map(detail => `
                    <div class="detail-item">
                        <span class="detail-label">${detail.label}:</span>
                        <span class="detail-value">${detail.value}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function generateFamilySection(template) {
    const details = [
        { label: "Father's Name", value: formData.fatherName },
        { label: "Father's Occupation", value: formData.fatherOccupation },
        { label: "Mother's Name", value: formData.motherName },
        { label: "Mother's Occupation", value: formData.motherOccupation },
        { label: 'Brothers', value: formData.brothers },
        { label: 'Sisters', value: formData.sisters },
        { label: 'Family Type', value: formData.familyType ? formData.familyType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) : '' },
        { label: 'Family Values', value: formData.familyValues ? formData.familyValues.charAt(0).toUpperCase() + formData.familyValues.slice(1) : '' }
    ].filter(item => item.value);

    if (details.length === 0) return '';

    return `
        <div class="detail-section">
            <h4 style="color: ${template.colors[0]};">Family Information</h4>
            <div class="detail-grid">
                ${details.map(detail => `
                    <div class="detail-item">
                        <span class="detail-label">${detail.label}:</span>
                        <span class="detail-value">${detail.value}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function generateLifestyleSection(template) {
    const details = [
        { label: 'Food Habits', value: formData.foodHabits ? formData.foodHabits.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) : '' },
        { label: 'Smoking', value: formData.smoking ? formData.smoking.charAt(0).toUpperCase() + formData.smoking.slice(1) : '' },
        { label: 'Languages', value: formData.languages },
        { label: 'Hobbies & Interests', value: formData.hobbies, full: true },
        { label: 'About Yourself', value: formData.aboutYourself, full: true }
    ].filter(item => item.value);

    if (details.length === 0) return '';

    return `
        <div class="detail-section">
            <h4 style="color: ${template.colors[0]};">Lifestyle & Preferences</h4>
            ${details.map(detail => `
                <div class="detail-item ${detail.full ? 'detail-full' : ''}">
                    <span class="detail-label">${detail.label}:</span>
                    <span class="detail-value">${detail.value}</span>
                </div>
            `).join('')}
        </div>
    `;
}

function generatePartnerPreferencesSection(template) {
    const ageRange = formData.preferredAgeFrom && formData.preferredAgeTo ? 
        `${formData.preferredAgeFrom} - ${formData.preferredAgeTo} years` : '';

    const details = [
        { label: 'Preferred Age', value: ageRange },
        { label: 'Preferred Education', value: formData.preferredEducation ? formData.preferredEducation.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) : '' },
        { label: 'Preferred Profession', value: formData.preferredProfession },
        { label: 'Preferred Location', value: formData.preferredLocation },
        { label: 'Other Expectations', value: formData.otherExpectations, full: true }
    ].filter(item => item.value);

    if (details.length === 0) return '';

    return `
        <div class="detail-section">
            <h4 style="color: ${template.colors[0]};">Partner Preferences</h4>
            ${details.map(detail => `
                <div class="detail-item ${detail.full ? 'detail-full' : ''}">
                    <span class="detail-label">${detail.label}:</span>
                    <span class="detail-value">${detail.value}</span>
                </div>
            `).join('')}
        </div>
    `;
}

function generateContactSection(template) {
    const details = [
        { label: 'Phone', value: formData.phoneNumber },
        { label: 'Email', value: formData.emailAddress },
        { label: 'Preferred Contact', value: formData.preferredContactMethod ? formData.preferredContactMethod.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) : '' },
        { label: 'Address', value: formData.address, full: true }
    ].filter(item => item.value);

    if (details.length === 0) return '';

    return `
        <div class="detail-section">
            <h4 style="color: ${template.colors[0]};">Contact Information</h4>
            ${details.map(detail => `
                <div class="detail-item ${detail.full ? 'detail-full' : ''}">
                    <span class="detail-label">${detail.label}:</span>
                    <span class="detail-value">${detail.value}</span>
                </div>
            `).join('')}
        </div>
    `;
}

function updateProgress() {
    const requiredFields = ['fullName', 'dateOfBirth', 'gender', 'maritalStatus'];
    const totalSections = 8;
    
    let completedSections = 0;
    
    // Check form completion
    const filledRequired = requiredFields.filter(field => formData[field]).length;
    const totalOptional = Object.keys(formData).length - filledRequired;
    
    if (filledRequired === requiredFields.length) {
        completedSections += Math.min(6, 1 + Math.floor(totalOptional / 5));
    }
    
    // Check photo upload
    if (formData.photo) {
        completedSections += 1;
    }
    
    // Check template selection
    if (selectedTemplate) {
        completedSections += 1;
    }
    
    const percentage = Math.round((completedSections / totalSections) * 100);
    
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    if (progressFill) {
        progressFill.style.width = `${percentage}%`;
    }
    
    if (progressText) {
        progressText.textContent = `${percentage}% Complete`;
    }
}

function loadSavedData() {
    try {
        const savedFormData = localStorage.getItem('matrimonialFormData');
        if (savedFormData) {
            formData = JSON.parse(savedFormData);
            populateForm();
            console.log('Loaded saved form data');
        }
        
        const savedPhoto = localStorage.getItem('uploadedPhoto');
        if (savedPhoto) {
            formData.photo = savedPhoto;
            showPhotoPreview(savedPhoto);
            console.log('Loaded saved photo');
        }
        
        const savedTemplate = localStorage.getItem('selectedTemplate');
        if (savedTemplate && templates.find(t => t.id === savedTemplate)) {
            selectedTemplate = savedTemplate;
            console.log('Loaded saved template:', savedTemplate);
        }
        
    } catch (e) {
        console.warn('Could not load saved data:', e);
    }
}

function showPhotoPreview(imageSrc) {
    const previewImage = document.getElementById('previewImage');
    const photoPlaceholder = document.getElementById('photoPlaceholder');
    const selectPhotoBtn = document.getElementById('selectPhotoBtn');
    const removePhotoBtn = document.getElementById('removePhotoBtn');

    if (previewImage && photoPlaceholder && selectPhotoBtn && removePhotoBtn) {
        previewImage.src = imageSrc;
        previewImage.style.display = 'block';
        photoPlaceholder.style.display = 'none';
        selectPhotoBtn.textContent = 'Change Photo';
        removePhotoBtn.style.display = 'inline-block';
        console.log('Photo preview displayed');
    }
}

function populateForm() {
    Object.keys(formData).forEach(key => {
        if (key === 'photo') return; // Skip photo field
        
        const field = document.querySelector(`[name="${key}"]`);
        if (field) {
            if (field.type === 'checkbox') {
                const checkboxes = document.querySelectorAll(`[name="${key}"]`);
                checkboxes.forEach(cb => {
                    cb.checked = Array.isArray(formData[key]) && formData[key].includes(cb.value);
                });
            } else {
                field.value = formData[key];
            }
        }
    });
}

function showMessage(message, type = 'info') {
    console.log(`${type.toUpperCase()}: ${message}`);
    
    const existingMessage = document.querySelector('.success-message, .error-message, .info-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `${type}-message success-message`; // Reuse success-message styles
    messageDiv.textContent = message;
    
    // Insert at the top of the main content
    const mainContent = document.querySelector('.main-content .container');
    if (mainContent) {
        mainContent.insertBefore(messageDiv, mainContent.firstChild);
        
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 4000);
    }
}
