// import { URL_API } from "../../redux/actions/actionsTypes";
// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { getTeams } from "../../redux/actions/actions";
// import validations from "../../helpers/validations";
// import axios from "axios";

// import styles from "./form.module.css";
// // Componente Form
const Form = () => {
  return (
    <div>
      <h2>Hola, soy el Form. y estoy aqui para complicar tu existencia </h2>
    </div>
  );
};
export default Form;
// const Form = () => {
//   // Estado del componente
//   const teams = useSelector((state) => state.teams); // Obtiene el estado de los equipos desde Redux.
//   const dispatch = useDispatch(); // Obtiene la función de despacho de acciones de Redux.
//   const navigate = useNavigate(); // Obtiene la función de navegación.
//   const sortedTeams = teams
//     .slice()
//     .sort((a, b) => a.teamName.localeCompare(b.teamName));
//   const [selectedTeams, setSelectedTeams] = useState([]); // Estado para almacenar los equipos seleccionados.
//   const [formError, setFormError] = useState({}); // Estado para errores del formulario.
//   const [form, setForm] = useState({
//     name: "",
//     lastName: "",
//     nationality: "",
//     dob: "",
//     description: "",
//     teams: [],
//   }); // Estado para los datos del formulario.

//   // Función para validar el formulario
//   const handleValidation = () => {
//     const errors = validations(form); // Llama a la función de validación y almacena los errores.
//     setFormError(errors); // Actualiza el estado de errores del formulario.
//   };

//   // Función para manejar los cambios en los datos del formulario
//   const handleFormData = (event) => {
//     const { name, value } = event.target;
//     setForm({ ...form, [name]: value }); // Actualiza los datos del formulario.
//   };

//   // Función para manejar cambios en la selección de equipos
//   const handleTeamsChange = (event) => {
//     const selectedTeamId = event.target.value;

//     // Filtra los equipos seleccionados y los almacena en el estado
//     const selectedTeam = teams.find((team) => team.id === selectedTeamId);
//     setSelectedTeams((prevSelectedTeams) => {
//       if (prevSelectedTeams.some((team) => team.id === selectedTeamId)) {
//         return prevSelectedTeams.filter((team) => team.id !== selectedTeamId);
//       } else {
//         return [...prevSelectedTeams, selectedTeam];
//       }
//     });
//   };

//   // Función para eliminar un equipo seleccionado
//   const handleRemoveTeam = (teamId) => {
//     setSelectedTeams((prevSelectedTeams) => {
//       return prevSelectedTeams.filter((id) => id !== teamId);
//     });
//   };

//   // Función para manejar el envío del formulario
//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const arrTeam = selectedTeams.map((team) => team.teamName);
//       const teamsOk = arrTeam.join(", ");
//       // Realiza una solicitud POST a la URL_API para crear un conductor
//       await axios.post(`${URL_API}/drivers`, {
//         forename: form.name,
//         surname: form.lastName,
//         description: form.description,
//         nationality: form.nationality,
//         // image: form.image,
//         dob: form.dob,
//         teamName: teamsOk,
//       });
//       alert("Driver creado"); // Muestra una alerta de éxito.
//       navigate(-1); // Navega de vuelta a la página anterior.
//     } catch (error) {
//       alert("Ese driver ya existe"); // Muestra una alerta de error.
//     }
//   };

//   // Función para deshabilitar el botón de envío
//   const disableButton = () => {
//     let aux = true;

//     if (Object.keys(formError).length === 0) {
//       aux = false;
//     }

//     return aux;
//   };

//   // Efecto para obtener los equipos cuando se monta el componente
//   useEffect(() => {
//     dispatch(getTeams()); // Obtiene los equipos utilizando la acción getTeams.
//   }, []);

//   // Efecto para transformar la selección de equipos antes de enviar el formulario
//   useEffect(() => {
//     const teamsTransform = selectedTeams.map((teamId) => parseInt(teamId));
//     setForm((prevForm) => ({ ...prevForm, teams: teamsTransform }));
//   }, [selectedTeams]);

//   // Efecto para validar el formulario cuando cambian los datos del formulario
//   useEffect(() => {
//     handleValidation();
//   }, [form]);
//   // Renderizado del formulario
//   return (
//     <div className={styles["form-Container"]}>
//       <form className={styles.form} onSubmit={handleSubmit}>
//         <label>* Nombre:</label>
//         <input type="text" name="name" onChange={handleFormData} />
//         {formError.name ? (
//           <p className={styles.error}>{formError.name}</p>
//         ) : (
//           <p>
//             <br />
//           </p>
//         )}

//         <label>* Apellido:</label>
//         <input
//           type="text"
//           name="lastName"
//           value={form.lastName}
//           onChange={handleFormData}
//         />
//         {formError.lastName ? (
//           <p className={styles.error}>{formError.lastName}</p>
//         ) : (
//           <p>
//             <br />
//           </p>
//         )}

//         <label>* Nacionalidad:</label>
//         <input
//           type="text"
//           name="nationality"
//           value={form.nationality}
//           onChange={handleFormData}
//         />
//         {formError.nationality ? (
//           <p className={styles.error}>{formError.nationality}</p>
//         ) : (
//           <p>
//             <br />
//           </p>
//         )}

//         <label>* Fecha de Nacimiento:</label>
//         <input
//           type="date"
//           name="dob"
//           value={form.dob}
//           onChange={handleFormData}
//         />
//         {formError.dob ? (
//           <p className={styles.error}>{formError.dob}</p>
//         ) : (
//           <p>
//             <br />
//           </p>
//         )}

//         <label>Descripción:</label>
//         <textarea
//           rows="5"
//           type="text"
//           name="description"
//           value={form.description}
//           onChange={handleFormData}
//         />

//         <div className={styles.selectTeams}>
//           <label>* Equipos:</label>
//           <select name="teams" id="" onChange={handleTeamsChange} value="">
//             <option value="" disabled>
//               Selecciona un equipo
//             </option>
//             {sortedTeams.map((team) => (
//               <option key={team.id} value={team.id}>
//                 {team.teamName}
//               </option>
//             ))}
//           </select>
//           <div>
//             {selectedTeams.map((teamId) => {
//               const team = teams.find((team) => team.id == teamId);
//               return (
//                 <div className={styles["team-checkbox"]}>
//                   <span>{team?.teamName}</span>
//                   <button
//                     className={styles.buttonX}
//                     onClick={() => handleRemoveTeam(teamId)}
//                   >
//                     X
//                   </button>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//         {formError.teams && <p className={styles.error}>{formError.teams}</p>}
//         <br />

//         <button
//           className={styles.buttonSubmit}
//           disabled={disableButton()}
//           type="submit"
//         >
//           Crear Driver
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Form;
