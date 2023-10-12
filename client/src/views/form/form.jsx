import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTeams, postDriver } from "../../redux/actions/actions";
import validations from "../../helpers/validations";

import styles from "./form.module.css";

const Form = () => {
  const teams = useSelector((state) => state.allTeams);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sortedTeams = teams
    .slice()
    .sort((a, b) => a.teamName.localeCompare(b.teamName));
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [formError, setFormError] = useState({});
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    nationality: "",
    dob: "",
    description: "",
    image: "",
    teams: [],
  });

  const handleValidation = () => {
    const errors = validations(form);
    setFormError(errors);
  };

  const handleFormData = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleTeamsChange = (event) => {
    const selectedTeamId = event.target.value;
    const selectedTeam = teams.find((team) => team.id === selectedTeamId);
    setSelectedTeams((prevSelectedTeams) => {
      if (prevSelectedTeams.some((team) => team.id === selectedTeamId)) {
        return prevSelectedTeams.filter((team) => team.id !== selectedTeamId);
      } else {
        return [...prevSelectedTeams, selectedTeam];
      }
    });
  };

  const handleRemoveTeam = (teamId) => {
    setSelectedTeams((prevSelectedTeams) => {
      return prevSelectedTeams.filter((id) => id !== teamId);
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const arrTeam = selectedTeams.map((team) => team.teamName);
    const teamsOk = arrTeam.join(", ");
    const newDriver = {
      forename: form.name,
      surname: form.lastName,
      description: form.description,
      image: form.image,
      nationality: form.nationality,
      dob: form.dob,
      teamName: teamsOk,
    };
    const res = await postDriver(newDriver);
    console.log(res);
    if (res === true) {
      navigate("/home");
    }
  };

  const disableButton = () => {
    let aux = true;

    if (Object.keys(formError).length === 0) {
      aux = false;
    }

    return aux;
  };

  useEffect(() => {
    dispatch(getTeams());
  }, []);

  useEffect(() => {
    const teamsTransform = selectedTeams.map((teamId) => parseInt(teamId));
    setForm((prevForm) => ({ ...prevForm, teams: teamsTransform }));
  }, [selectedTeams]);

  useEffect(() => {
    handleValidation();
  }, [form]);

  return (
    <div className={styles["form-Container"]}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" onChange={handleFormData} />
        {formError.name ? (
          <p className={styles.error}>{formError.name}</p>
        ) : (
          <p>
            <br />
          </p>
        )}

        <label>Last name:</label>
        <input
          type="text"
          name="lastName"
          value={form.lastName}
          onChange={handleFormData}
        />
        {formError.lastName ? (
          <p className={styles.error}>{formError.lastName}</p>
        ) : (
          <p>
            <br />
          </p>
        )}

        <label>Nationality:</label>
        <input
          type="text"
          name="nationality"
          value={form.nationality}
          onChange={handleFormData}
        />
        {formError.nationality ? (
          <p className={styles.error}>{formError.nationality}</p>
        ) : (
          <p>
            <br />
          </p>
        )}

        <label>Date of Birth:</label>
        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleFormData}
        />
        {formError.dob ? (
          <p className={styles.error}>{formError.dob}</p>
        ) : (
          <p>
            <br />
          </p>
        )}
        <label>Image:</label>
        <input
          type="text"
          name="image"
          value={form.image}
          onChange={handleFormData}
        />
        {formError.image ? (
          <p className={styles.error}>{formError.image}</p>
        ) : (
          <p>
            <br />
          </p>
        )}
        <label>Description:</label>
        <textarea
          rows="5"
          type="text"
          name="description"
          value={form.description}
          onChange={handleFormData}
        />

        <div className={styles.selectTeams}>
          <label>Equipos:</label>
          <select name="teams" id="" onChange={handleTeamsChange} value="">
            <option value="" disabled>
              Select a team{" "}
            </option>
            {sortedTeams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.teamName}
              </option>
            ))}
          </select>
          <div>
            {selectedTeams.map((teamId) => {
              const team = teams.find((elem) => elem.id == teamId.id);
              return (
                <div className={styles["team-checkbox"]}>
                  <span className={styles.teams}>{team?.teamName}</span>
                  <button
                    type="button"
                    className={styles.buttonX}
                    onClick={() => handleRemoveTeam(teamId)}
                  >
                    X
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        {formError.teams && <p className={styles.error}>{formError.teams}</p>}
        <br />
        {Object.values(formError).length === 0 && (
          <button
            className={styles.buttonSubmit}
            disabled={disableButton()}
            type="submit"
          >
            Create Driver{" "}
          </button>
        )}
      </form>
    </div>
  );
};

export default Form;
