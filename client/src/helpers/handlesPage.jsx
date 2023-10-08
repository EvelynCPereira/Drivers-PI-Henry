import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../redux/actions/actions";

const [perPage, setPerPage] = useState(9);
const { allDrivers, aux, page } = useSelector((state) => state);
const dispatch = useDispatch();
const selectDrivers = aux?.length === 0 ? allDrivers : aux;
const totalPages = Math.ceil(selectDrivers.length / perPage);

const handleNext = () => {
  if (page !== totalPages) {
    dispatch(setPage(page + 1));
  }
};

const handlePrev = () => {
  if (page > 1) {
    dispatch(setPage(page - 1));
  }
};
export default { handleNext, handlePrev };
