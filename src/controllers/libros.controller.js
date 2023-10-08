import { pool } from "../db.js";

export const getLibros = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Libros");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal" });
  }
};

export const getLibro = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Libros WHERE id = ?", [
      req.params.id,
    ]);

    if (rows.length <= 0)
      return res.status(404).json({ message: " Libro no encontrado" });

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal" });
  }
};

export const createLibros = async (req, res) => {
  try {
    const { titulo, autor, genero, fechaDeSalida } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO Libros ( titulo,autor,genero,fechaDeSalida) VALUES (?, ?, ?, ?)",
      [titulo, autor, genero, fechaDeSalida]
    );
    res.send({
      id: rows.insertId,
      titulo,
      autor,
      genero,
      fechaDeSalida,
    });
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal" });
  }
};

export const deleteLibros = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM Libros WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows <= 0)
      return res.status(404).json({ message: "Libro no encontrado" });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal" });
  }
};

export const updateLibros = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, autor, genero, fechaDeSalida } = req.body;

    const [result] = await pool.query(
      "UPDATE Libros SET titulo = ?, autor = IFNULL(?), genero = IFNULL(?), fechaDeSalida = IFNULL(?) WHERE id = ?",
      [titulo, autor, genero, fechaDeSalida, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Libro no encontrado" });
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal" });
  }
};
