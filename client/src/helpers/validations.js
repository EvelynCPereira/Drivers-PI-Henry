const validations = (form) => {
  const errors = {};

  if (form.name === "") {
    errors.name = "Se requiere un nombre";
  } else if (!/^[a-zA-Z ]+$/.test(form.name)) {
    errors.name = "El nombre no puede contener caracteres especiales o numeros";
  }

  if (form.lastName === "") {
    errors.lastName = "Se requiere un apellido";
  } else if (!/^[a-zA-Z ]+$/.test(form.lastName)) {
    errors.lastName =
      "El apellido no puede contener caracteres especiales o números";
  }

  if (form.nationality === "") {
    errors.nationality = "Se requiere una nacionalidad";
  } else if (!/^[a-zA-Z ]+$/.test(form.nationality)) {
    errors.nationality =
      "La nacionalidad no puede contener caracteres especiales o números";
  }

  if (form.dob === "") {
    errors.dob = "Se requiere una fecha de nacimiento";
  }

  if (form.teams.length === 0) {
    errors.teams = "Se requiere un equipo";
  }

  return errors;
};
export default validations;
