async function generarResumenIA(contexto) {
  return {
    ok: true,
    provider: "claude",
    mensaje:
      "Stub activo. Integra aqui la llamada real al SDK de Anthropic para generar resumenes o recomendaciones.",
    contexto
  };
}

module.exports = {
  generarResumenIA
};
