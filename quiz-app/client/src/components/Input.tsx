import { user, registerUser } from "@/models/userType";
import TextField from "@mui/material/TextField";
import { useController, UseControllerProps } from "react-hook-form";
// this place there are two type , 
//but i do not how to add them : user, registerUser
function Input(props: UseControllerProps<any>) {
  const { field, fieldState } = useController(props);

  return (
    <div>
      <TextField
        {...field}
        placeholder={props.name}
        fullWidth
        required
        sx={{ marginBottom: 2 }}
      />
      {/* <input {...field} placeholder={props.name} /> */}
      {/* <p>{fieldState.isTouched && "Touched"}</p> */}
    </div>
  );
}

export default Input;
