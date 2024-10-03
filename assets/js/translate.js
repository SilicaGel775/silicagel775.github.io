let currentLanguage = defaultLanguage;
let translations = {};

async function loadTranslations(lang) {
  try {
    const response = await fetch(`assets/lang/${lang}.json`);
    translations = await response.json();

    if (prioritizeTranslatedHeader) {
      if (translations.header) {
        headerLogoText = translations.header.logoText || headerLogoText;
        headerLinks = translations.header.links || headerLinks;
      }
    }
    if (prioritizeTranslatedTutorial) {
      if (translations.tutorial) {
        tutorialDefinitions = translations.tutorial || tutorialDefinitions;
      }
    }
    if (prioritizeTranslatedAccessories) {
      if (translations.accessories) {
        whichAccessoriesToUse = translations.accessories.content || simpleAbout;
      }
    }

    updatePageTranslations();
  } catch (error) {
    console.error(`Failed to load translations for ${lang}:`, error);
  }
}

function updatePageTranslations() {
  // Update the content of the page
  updateTranslations();
  // Update header content
  if (prioritizeTranslatedHeader) {
    updateHeaderContent();
  }
  // Update tutorial content
  if (prioritizeTranslatedTutorial) {
    updateTutorialContent();
  }
  // Update accessories content
  if (prioritizeTranslatedAccessories) {
    updateAccessoriesContent();
  }
}

// Initialize language system
document.addEventListener("DOMContentLoaded", () => {
  loadTranslations(currentLanguage);
});

// Update Main Translations
function updateTranslations() {
  const t = translations.main || {}; // Use empty object as fallback

  // Update text content for various elements
  //doc.select("#baseline-icon text").text(d => d === 'BASE' ? (t.base || 'BASE') : (t.line || '-LINE'));
  doc.selectAll("#pin-icon text").text(t.pin || "PIN");

  // Left (Secondary) panel
  doc
    .selectAll(".selector-tabs button")
    .data([
      t.selectBrands || "Brands",
      t.selectModels || "Models",
      t.selectEqualizer || "Equalizer",
    ])
    .text((d) => d);
  doc
    .select(".selector-panel .search")
    .attr("placeholder", t.searchBar || "Search");

  // Tools panel
  doc.select("#copy-url").text(t.copyUrl || "Copy URL");
  doc.select("#download-faux").text(t.screenshot || "Screenshot");
  doc.select("#avg-all").text(t.averageAll || "Average All");

  doc.select(".yscaler span").text(t.yAxisScale || "Y-axis Scale:");

  doc.select(".zoom span").text(t.zoom || "Zoom:");
  doc
    .selectAll(".zoom button")
    .data([t.bass || "Bass", t.mids || "Mids", t.treble || "Treble"])
    .text((d) => d);

  doc.select(".normalize span").text(t.normalize || "Normalize:");

  doc.select(".smooth span").text(t.smooth || "Smooth:");

  doc
    .selectAll(".miscTools button")
    .data([
      { id: "inspector", text: t.inspect || "inspect" },
      { id: "label", text: t.label || "label" },
      { id: "download", text: t.screenshot || "screenshot" },
      { id: "recolor", text: t.recolor || "recolor" },
      { id: "theme", text: t.darkmode || "Dark Mode" },
    ])
    .text((d) => d.text);

  // Custom DF
  doc
    .select(".customDF > span")
    .text(t.preferenceAdjustments || "Preference Adjustments:");
  doc
    .selectAll(".customDF > div > span")
    .data([
      t.tiltUnit || "Tilt (dB/Oct)",
      t.bassUnit || "Bass (dB)",
      t.trebleUnit || "Treble (dB)",
      t.earGainUnit || "Ear Gain (dB)",
    ])
    .text((d) => d);

  doc
    .select("#cusdf-UnTiltTHIS")
    .text(t.removeAdjustments || "Remove Adjustments");
  doc.select("#cusdf-harmanfilters").text(t.harmanFilters || "Harman Filters");
  doc.select("#cusdf-bounds").text(t.preferenceBounds || "Preference Bounds");

  doc
    .select(".manageTable .helpText")
    .text(
      t.addHelp || "(or middle/ctrl-click when selecting; or pin other IEMs)"
    );
  doc.select(".manageTable .addLock").text(t.lock || "LOCK");

  // Tbody Alert
  const alertText = t.selectModelAlert || "Select a model from the list below to graph its frequency response";
  const style = document.createElement('style');
  style.textContent = `
    tbody.curves:empty:before {
      content: '${alertText}';
    }
  `;
  document.head.appendChild(style);

  // Equalizer panel
  doc.select(".extra-panel h4").text(t.uploading || "Uploading");
  doc.select(".upload-fr").text(t.uploadFR || "Upload FR");
  doc.select(".upload-target").text(t.uploadTarget || "Upload Target");
  doc.select(".upload-track").text(t.uploadSong || "Upload Song");
  doc
    .select(".extra-upload small")
    .text(t.uploadWarning || "Uploaded data will not be persistent");

  doc
    .selectAll(".extra-eq h4")
    .data([
      t.parametricEqualizer || "Parametric Equalizer",
      t.autoEQ || "AutoEQ",
      t.eqDemo || "EQ Demo",
      t.miscellaneous || "Miscellaneous",
    ])
    .text((d) => d);

  doc
    .select(".select-eq-phone option")
    .text(t.chooseEQModel || "Choose EQ model");
  doc.select("#preamp-disp").text(`${t.preamp || "Pre-amp"}: 0.0 dB`);

  doc
    .selectAll(".filters-header span")
    .data([
      t.type || "Type",
      t.frequency || "Frequency",
      t.gain || "Gain",
      t.q || "Q",
    ])
    .text((d) => d);

  //doc.select(".add-filter").text(t.add || '+');
  //doc.select(".remove-filter").text(t.remove || '-');
  doc.select(".sort-filters").text(t.sort || "Sort");
  doc.select(".disable-filters").text(t.disable || "Disable");
  doc.select(".save-filters").text(t.saveEQ || "Save EQ");

  doc
    .selectAll(".settings-row [name='title']")
    .data([
      t.autoEqFrequencyRange || "Frequency Range",
      t.autoEqGainRange || "Gain Range",
      t.autoEqQRange || "Q Range",
    ])
    .text((d) => d);

  doc.select(".auto-eq-button .autoeq").text(t.autoEQ || "AutoEQ");
  doc.select(".auto-eq-button .readme").text(t.readme || "Readme");

  doc
    .selectAll(".eq-track option")
    .data([
      t.pinkNoise || "Pink Noise",
      t.scarletFire || "Scarlet Fire",
      t.toneGenerator || "Tone Generator",
      t.uploaded || "Uploaded",
    ])
    .text((d) => d);

  doc
    .select("[name='tone-gen-range'] [name='title']")
    .text(t.toneGeneratorRange || "Tone Generator Range");
  //doc.select("[name='current-freq']").text(`${t.freq || 'Freq'}: <span class="freq-text">20</span> Hz`);

  doc.select(".settings-row [name='balance-l']").text(t.left || "Left");
  doc
    .select(".settings-row [name='balance-title']")
    .text(t.channelBalance || "Channel Balance");
  doc.select(".settings-row [name='balance-r']").text(t.right || "Right");

  doc.select(".import-filters").text(t.importEQ || "Import EQ");
  doc
    .select(".export-filters")
    .text(t.exportParametricEQ || "Export Parametric EQ");
  doc
    .select(".export-graphic-filters")
    .text(t.exportGraphicEQ || "Export Graphic EQ (Wavelet)");

  doc
    .select(".extra-eq-overlay")
    .text(
      t.autoEQRunning ||
        "AutoEQ is running, it could take 5~20 seconds or more."
    );
}

function updateHeaderContent() {
  const t = translations.header || {}; // Use empty object as fallback

  const logoTextElement = document.querySelector(".logo a span");
  if (logoTextElement) {
    logoTextElement.textContent = t.logoText || headerLogoText;
  }

  const headerLinks = document.querySelectorAll(".header-links a");
  headerLinks.forEach((linkElement, i) => {
    const link = t.links[i] || headerLinks[i];
    linkElement.textContent = link.name || headerLinks[i].name;
    linkElement.setAttribute("href", link.url || headerLinks[i].url);
  });
}

function updateTutorialContent() {
  const t = translations.tutorial || []; // Use empty array as fallback

  const tutorialButtons = document.querySelectorAll(
    ".tutorial-buttons .button-segment"
  );
  tutorialButtons.forEach((button, i) => {
    const tutorialData = t[i] || tutorialDefinitions[i];
    button.textContent = tutorialData.name || tutorialDefinitions[i].name;
  });

  const tutorialDescriptions = document.querySelectorAll(
    ".tutorial-description .description-segment p"
  );
  tutorialDescriptions.forEach((description, i) => {
    const tutorialData = t[i] || tutorialDefinitions[i];
    description.textContent =
      tutorialData.description || tutorialDefinitions[i].description;
  });
}

function updateAccessoriesContent() {
  const t = translations.accessories || {}; // Use empty object as fallback

  doc.select(".accessories aside").html(t.content || simpleAbout);
}
