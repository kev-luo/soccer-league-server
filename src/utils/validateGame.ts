import { GameInput } from "../resolvers/game";

export const validateGame = (input: GameInput) => {

  if (input.date.length <= 2) {
    return [
      {
        field: "date",
        message: "The game must have a set date."
      }
    ]

  }

  return null
}