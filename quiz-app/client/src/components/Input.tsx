import { user, registerUser } from "@/models/userType";
import TextField from "@mui/material/TextField";
import { useController, UseControllerProps } from "react-hook-form";
// this place there are two type ,
//but i do not how to add them : user, registerUser
interface InputProps extends UseControllerProps<any> {
  type?: string;
}
function Input(props: InputProps) {
  const { field, fieldState } = useController(props);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.type === "number") {
      field.onChange(parseInt(event.target.value));
    } else {
      field.onChange(event.target.value);
    }
  };
  return (
    <div>
      <TextField
        {...field}
        placeholder={props.name}
        fullWidth
        required
        sx={{ marginBottom: 2 }}
        type={props.type || "text"}
        onChange={handleChange}
      />
      {/* <input {...field} placeholder={props.name} /> */}
      {/* <p>{fieldState.isTouched && "Touched"}</p> */}
    </div>
  );
}

export default Input;
