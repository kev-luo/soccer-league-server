import { PlayerInput } from "../resolvers/player";

export const validatePlayer = (input: PlayerInput) => {

  if (input.age > 100) {
    return [
      { 
        field: "age", 
        message: "Player is over the age limit" 
      }
    ]

  }

  return null
}