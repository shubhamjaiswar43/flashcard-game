const pool = require('./connection');

const getAdmins = async () => {
    try {
        const [rows] = await pool.query('SELECT * FROM admin');
        return rows;
    } catch (err) {
        console.error('Error fetching admins:', err);
        throw err;
    }
};

const getAdminByUsername = async (username) => {
    try {
        const [rows] = await pool.query('SELECT * FROM admin WHERE username = ?', [username]);
        return rows;
    } catch (err) {
        console.error('Error fetching admins:', err);
        throw err;
    }
};

const addAdmin = async (name, username, password) => {
    try {
        const [result] = await pool.query('INSERT INTO admin (name, username, password) VALUES (?, ?, ?)', [name, username, password]);
        return result.insertId;
    } catch (err) {
        console.error('Error adding admin:', err);
        throw err;
    }
};

const updateAdmin = async (id, name, username, password) => {
    try {
        const [result] = await pool.query('UPDATE admin SET name = ?, username = ?, password = ? WHERE id = ?', [name, username, password, id]);
        console.log('Admin updated:', result.affectedRows);
        return result.affectedRows;
    } catch (err) {
        console.error('Error updating admin:', err);
        throw err;
    }
};

const deleteAdmin = async (id) => {
    try {
        const [result] = await pool.query('DELETE FROM admin WHERE id = ?', [id]);
        console.log('Admin deleted:', result.affectedRows);
        return result.affectedRows;
    } catch (err) {
        console.error('Error deleting admin:', err);
        throw err;
    }
};

module.exports = { getAdmins, addAdmin, updateAdmin, deleteAdmin, getAdminByUsername };