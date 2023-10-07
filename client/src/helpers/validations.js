const validations = (form) => {
  const errors = {};
  if (form.name === "") {
    errors.name = "A name is required";
  } else if (!/^[a-zA-Z ]+$/.test(form.name)) {
    errors.name = "The name cannot contain special characters or numbers.";
  }

  if (form.lastName === "") {
    errors.lastName = "A last name is required";
  } else if (!/^[a-zA-Z ]+$/.test(form.lastName)) {
    errors.lastName =
      "The last name cannot contain special characters or numbers";
  }

  if (form.nationality === "") {
    errors.nationality = "A nationality is required";
  } else if (!/^[a-zA-Z ]+$/.test(form.nationality)) {
    errors.nationality =
      "Nationality cannot contain special characters or numbers";
  }
  if (form.image === "") {
    errors.image = "Image URL required";
  } else if (!/\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i.test(form.image)) {
    errors.image = "The URL entered is not a valid image URL";
  }
  if (form.dob === "") {
    errors.dob = "A date of birth is required";
  }

  if (form.teams.length === 0) {
    errors.teams = "At least one team is required";
  }

  return errors;
};
export default validations;
