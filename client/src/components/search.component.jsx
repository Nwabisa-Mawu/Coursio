import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchInput = ({ value, onChange, placeholder = "Search..." }) => (
  <TextField
    sx={{
      '& .MuiOutlinedInput-root': {
        borderRadius: 2,
        '& fieldset': {
          borderColor: '#385664', // light border
        },
        '&:hover fieldset': {
          borderColor: '#aaa',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#888',
        },
        '& input': {
          height: '1.5em', // adjust input text height
          padding: '8px 0',
        },
      },
    }}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      ),
    }}
    />
);

export default SearchInput;
