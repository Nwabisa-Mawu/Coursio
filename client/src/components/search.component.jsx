import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

const SearchInput = ({ placeholder = "Search...", onChange }) => (
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
