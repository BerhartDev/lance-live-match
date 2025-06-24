export interface ActionInfo {
  iconPath?: string;
  emoji?: string;
  label: string;
}

export const getActionLabel = (
  action: string | null | undefined
): ActionInfo | null => {
  if (!action) return null;
  const actionLower = action.toLowerCase();

  switch (true) {
    case actionLower === "gol":
      return { iconPath: "/icons/Gol.svg", label: "Gol" };
    case actionLower.includes("cartão vermelho") ||
      actionLower.includes("cartao vermelho"):
      return { iconPath: "/icons/Cartao_vermelho.svg", label: "Cartão Vermelho" };
    case actionLower.includes("cartão") || actionLower.includes("cartao"):
      return {
        iconPath: "/icons/Cartao_amarelo.svg",
        label: "Cartão Amarelo",
      };
    case actionLower.includes("impedimento"):
      return { emoji: "🚫", label: "Impedimento" };
    case actionLower.includes("pênalti") || actionLower.includes("penalti"):
      return { emoji: "🎯", label: "Pênalti" };
    case actionLower.includes("fim de jogo"):
      return { iconPath: "/icons/Apito.svg", label: "Fim de Jogo" };
    case actionLower.includes("intervalo"):
      return { iconPath: "/icons/Intervalo.svg", label: "Intervalo" };
    case actionLower.includes("começo de jogo") ||
      actionLower.includes("começo do segundo tempo") ||
      actionLower.includes("início"):
      return { iconPath: "/icons/Apito.svg", label: "Início" };
    case actionLower.includes("substituição"):
      return { iconPath: "/icons/Substituicao.svg", label: "Substituição" };
    case actionLower.includes("atendimento médico"):
      return {
        iconPath: "/icons/Atendimento_medico.svg",
        label: "Atendimento Médico",
      };
    case actionLower.includes("defesa do goleiro"):
      return {
        iconPath: "/icons/Defesa_do_goleiro.svg",
        label: "Defesa do Goleiro",
      };
    default:
      return null;
  }
};
