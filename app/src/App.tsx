import { useState } from "react";
import {
  Input,
  Button,
  TextareaAutosize,
  CircularProgress,
} from "@mui/material";

function App() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const price = formData.get("price");
    const description = formData.get("description");

    if (!price || !description) {
      setError("Por favor, complete todos los campos.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/prueba", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          precio: price,
          descripcion: description,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar los datos");
      }
      setSuccess(true);
      setError(null);
    } catch (error) {
      setError("Error al enviar los datos: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {loading ? (
        <div className="flex flex-col items-center">
          <CircularProgress />
          <p className="mt-4 text-2xl">Publicando...</p>
        </div>
      ) : (
        <>
          {success ? (
            <div className="flex flex-col items-center">
              <p className="text-2xl text-green-600 mb-4">Operación exitosa</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={i} style={{ marginTop: "1rem" }}>
                    <a
                      href={`http://localhost:3000/screenshots/step${i}.jpg`}
                      target="_blank"
                    >
                      <img
                        src={`http://localhost:3000/screenshots/step${i}.jpg`}
                        alt={`Paso ${i + 1}`}
                        style={{
                          width: "200px",
                          borderRadius: "8px",
                          border: "1px solid #ccc",
                        }}
                      />
                    </a>
                  </div>
                ))}
              </div>
              <small
                className="text-gray-500 mt-4"
                style={{ textAlign: "center" }}
              >
                Puedes ver los pasos en una nueva pestaña haciendo clic en las
                imágenes.
              </small>
              <Button
                variant="contained"
                style={{ marginTop: "20px" }}
                onClick={() => setSuccess(false)}
              >
                Volver a publicar
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <h1 className="text-5xl text-center">Publica tu Carro</h1>
              <form onSubmit={handleSubmit}>
                <fieldset
                  disabled={loading}
                  className="flex flex-col items-center mt-8 gap-4 disabled:opacity-50"
                >
                  {error && <p className="text-red-500 mb-4">{error}</p>}
                  <Input
                    name="price"
                    type="number"
                    placeholder="Precio"
                    style={{ width: "300px" }}
                    inputProps={{ "aria-label": "price" }}
                  />
                  <TextareaAutosize
                    minRows={3}
                    maxRows={5}
                    name="description"
                    placeholder="Descripción"
                    style={{ width: "300px" }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ width: "300px" }}
                    aria-label="submit-button"
                  >
                    Publicar
                  </Button>
                </fieldset>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
