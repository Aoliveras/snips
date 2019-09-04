const shortid = require('shortid');
const db = require('../db');
const { readJsonFromDb, writeJsonToDb } = require('../utils/db.utils');
const ErrorWithHttpStatus = require('../utils/ErrorWithHttpStatus');

/**
 * a snippet object
 * @typedef {Object} Snippet
 * @property {string} id
 * @property {string} author
 * @property {string} code
 * @property {string} title
 * @property {string} description
 * @property {string} language
 * @property {string[]} comments
 * @property {number} favorites
 */

//  TODO: Do theese vunnn!!!
/**
 * Inserts a new snippet into the db.
 * @param {Snippet} newSnippet - the data to create the snippet with
 * @returns {Promise<Snippet>} the created snippet
 */
exports.insert = async ({ author, code, title, description, language }) => {
  try {
    if (!author || !code || !title || !description || !language)
      throw new ErrorWithHttpStatus('Missing properties', 400);
    return db.query(
      `INSERT INTO snippet (code, title, description, author, language) VALUES ($1, $2, $3, $4, $5)`,
      [code, title, description, author, language]
    );
    /*
    // read snippets.json
    const snippets = await readJsonFromDb('snippets');
    // grab data from newSnippet (validate)
    // make newSnippet a proper object
    // generate default data (id, comments, favorites)
    // push that object into snippets
    snippets.push({
      id: shortid.generate(),
      author,
      code,
      title,
      description,
      language,
      comments: [],
      favorites: 0,
    });
    // write back to the file
    await writeJsonToDb('snippets', snippets);
    return snippets[snippets.length - 1];
    */
  } catch (err) {
    if (err instanceof ErrorWithHttpStatus) throw err;
    else throw new ErrorWithHttpStatus('Database error');
  }
};

/**
 * Selects snippets from DB.
 * Can accept optional query object to filter results;
 * otherwise, returns all snippets.
 * @param {Object} [queryObj]
 * @returns {Promise<Snippet[]>} array of Snippet objects
 */
exports.select = async (queryObj = {}) => {
  try {
    const result = await db.query('SELECT * FROM snippet WHERE ');
    return result.rows;
    /*
    // 1. read the file
    // 2. parse it
    const snippets = await readJsonFromDb('snippets');
    // filter snippets with query
    // check if every query key
    // snippet[key] === query[key]
    const filtered = snippets.filter(snippet =>
      Object.keys(query).every(key => query[key] === snippet[key])
    );
    // 3. return the data
    return filtered;
    */
  } catch (err) {
    throw new ErrorWithHttpStatus('Database error');
  }
};

// TODO: do theese vunn
/**
 * Updates a snippet
 * @param {string} id - id of the snippet to update
 * @param {Snippet} newData - subset of values to update
 */
exports.update = async (id, { author, code, title, description, language }) => {
  try {
    const result = db.query(
      `UPDATE snippet SET author = $1, code = $2, title = $3, description = $4, language = $5   WHERE id = $6`,
      [author, code, title, description, language, id]
    );

    // Old Code
    /*
    // 1. read file
    const snippets = await readJsonFromDb('snippets');
    // 2. find the snippet with id
    let found = false;
    // 3. update the snippet with appropriate data (make sure to validate!)
    const updatedSnippets = snippets.map(snippet => {
      // if it's not the one we want, just return it
      if (snippet.id !== id) return snippet;

      // else we found what we're looking for
      found = true;
      // loop over keys in newData
      Object.keys(newData).forEach(key => {
        // check if snippet has that key and set it
        if (key in snippet) snippet[key] = newData[key];
        else throw new ErrorWithHttpStatus(`Invalid property ${key}`, 400);
      });
      return snippet;
    });

    if (!found)
      throw new ErrorWithHttpStatus(`Snippet with ID ${id} not found`, 404);

    // 4. write back to db
    return writeJsonToDb('snippets', updatedSnippets);
    */
  } catch (err) {
    if (err instanceof ErrorWithHttpStatus) throw err;
    else throw new ErrorWithHttpStatus('Database error', 500);
  }
};

/**
 * Deletes a snippet
 * @param {string} id
 */
exports.delete = async id => {
  try {
    const result = await db.query(`DELETE FROM snippet WHERE id = $1`, [id]);
    // Check if some number of rows was deleted
    if (result.rowCount === 0)
      throw new ErrorWithHttpStatus(`Snippet with ID ${id} not found`, 404); // short circuit if id not found

    // Old code
    /*
    // Read in the db file
    const snippets = await readJsonFromDb('snippets');
    // filter snippets for everything except snippet.id
    const filteredSnips = result.filter(snippet => snippet.id !== id);
    // const filteredSnips = snippets.filter(snippet => snippet.id !== id);
    if (filteredSnips.length === snippets.length)
      throw new ErrorWithHttpStatus(`Snippet with ID ${id} not found`, 404); // short circuit if id not found

    // write the file
    return writeJsonToDb('snippets', filteredSnips);
    */
  } catch (err) {
    if (err instanceof ErrorWithHttpStatus) throw err;
    else throw new ErrorWithHttpStatus('Database error', 500);
  }
};
