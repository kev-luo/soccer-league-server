import { TeamInput } from "../resolvers/team";

export const validateRegister = (input: TeamInput) => {

  if (input.name.length <= 2) {
    return [
      {
        field: "name",
        message: "Team name must be greater than 2 characters."
      }
    ]

  }

  if (input.primaryColor.length <= 2) {
    return [
      {
        field: "primaryColor",
        message: "Primary color must be greater than 2 characters."
      }
    ]

  }

  if (input.secondaryColor.length <= 2) {
    return [
      {
        field: "secondaryColor",
        message: "Secondary color must be greater than 2 characters."
      }
    ]

  }

  if (input.password.length <= 3) {
    return [
      {
        field: "password",
        message: "Password must be greater than 3 characters."
      }
    ]

  }

  return null
}