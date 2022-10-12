import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const BotonVerCerrar = ({i, idPedido,show,  onClick}) => {
  


  return (
    <button
      className="ml-4"
      ref={idPedido}
      id={i}
      onClick={(e) => onClick({ i }, e)}
    >
      {show && Number(idPedido.current.id) === i ? (
        <p className="text-lg ">
          <FontAwesomeIcon
            className="text-2xl transition ease-in duration-300  hover:-translate-y-1"
            icon={faEye}
          />
          Cerrar
        </p>
      ) : (
        <p className="text-lg">
          <FontAwesomeIcon
            className="text-2xl transition ease-in duration-300  hover:-translate-y-1"
            icon={faEyeSlash}
          />
          Ver
        </p>
      )}
    </button>
  );
};
