const [profilePicture, setProfilePicture] = useState(PicProfile);
const fileInputRef = useRef(null);


const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicture(reader.result);
    };
    reader.readAsDataURL(file);
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  console.log("Form submitted");
};

const handleClick = () => {
  navigate("/");
};
