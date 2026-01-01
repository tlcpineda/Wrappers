/**
 * Initialize PropertiesService to the required storage.
 * @param property_store {string} Either 'user', 'document', or 'script'; defaults to 'script'
 *
 * @return ps {Properties} The property store where the values are stored
 */
function set_properties_service(property_store) {
  let ps = PropertiesService.getScriptProperties();

  switch (property_store) {
    case "document":
      ps = PropertiesService.getDocumentProperties();
      break;
    case "user":
      ps = PropertiesService.getUserProperties();
      break;
  }

  return ps;
}

/**
 * Save object to script property as key-value pair; mask for setProperty.
 * @param key {string} The key associated with the value
 * @param data {Array | number} Either an array of values to be stored in Properties; or {number} for the "base_year".
 * @param method {string} Option "new" replaces (if existing) old value. Option "append" adds current value to existing value, or creates a new property if key-value pair does not exist.
 * @param ps {Properties} The property store where the values are stored; default to ScriptProperties
 */
function store_temp(
  key,
  data,
  method = "new",
  ps = PropertiesService().getScriptProperties(),
) {
  // const data_temp = ps.getProperty(key);
  const data_temp = get_temp(key, ps);

  let item_to_save = JSON.stringify(data);

  // Case when 'key' has been assigned and contains a value in storage
  if (data_temp) {
    if (method == "append") {
      // Concatenate exiting value with the current value.
      item_to_save = JSON.stringify(get_temp(key, ps).concat(data));
    }

    // Remove existing key property, before proceeding to write new property.
    delete_temp(key, ps);
  }

  // Save value, depending on method.
  ps.setProperty(key, item_to_save);
}

/**
 * Get the property saved with the matching key; mask for getProperty.
 * @param key {string} The key associated with the value
 * @param ps {Properties} The property store where the values are stored; default to ScriptProperties
 *
 * @return prop_data {object} The stored key-value pair
 */
function get_temp(key, ps = PropertiesService().getScriptProperties()) {
  const prop_data = JSON.parse(ps.getProperty(key)); // TODO Double check if stored value based on type

  return prop_data;
}

/**
 * Delete specified property by key, if any; mask for deletePropert().
 * @param key {string} The key associated with the value
 * @param ps {Properties} The property store where the values are stored; default to ScriptProperties
 */
function delete_temp(key, ps = PropertiesService().getScriptProperties()) {
  const property = ps.getProperty(key);

  // Check if key is assigned, before deleting.
  if (property) {
    ps.deleteProperty(key);
  }
}
