const personalInputs = [
  {
    type: "text",
    name: "firstName",
    value: "",
    id: "userFirstName",
    minlength: 1,
    maxlegth: 60,
    label: "First name:", //goes into label or p element
  },
  {
    type: "text",
    name: "lastName",
    value: "",
    id: "userLastName",
    required: true,
    minlength: 1,
    maxlegth: 60,
    label: "Last name:",
  },
  {
    type: "date",
    name: "birthday",
    value: "",
    id: "userBirthday",
    required: true,
    //range eg 1900-2010
    label: "Birthday:",
  },
];

const educationalInputs = [
  {
    type: "text",
    name: "facility",
    value: "",
    id: "userEdFacility",
    minlength: 1,
    maxlegth: 60,
    label: "Educational Facility:",
  },
  {
    type: "text",
    name: "study",
    value: "",
    id: "userStudy",
    required: true,
    minlength: 1,
    maxlegth: 60,
    label: "Study:",
  },
  {
    //should be two dates or range date picker
    type: "date",
    name: "dateOfStudy",
    value: "",
    id: "userStudyFinish",
    required: true,
    //range
    label: "Finished:",
  },
];
const workInputs = [
  {
    type: "text",
    name: "company",
    value: "",
    id: "userWorkCompanyName",
    minlength: 1,
    maxlegth: 60,
    label: "Company:",
  },
  {
    type: "text",
    name: "position",
    value: "",
    id: "userPositionTitle",
    minlength: 1,
    maxlegth: 60,
    label: "Position title:",
  },
  {
    type: "textarea",
    name: "responsibilities",
    value: "",
    id: "userWorkResponsibilities",
    minlength: 1,
    maxlegth: 60,
    label: "Main responsibilities:",
  },
  {
    type: "date",
    name: "fromEmployed",
    value: "",
    id: "userWorkStart",
    minlength: 1,
    maxlegth: 60,
    label: "Employed from:",
  },
  {
    type: "text",
    name: "toEmployed",
    value: "",
    id: "userWorkEnd",
    minlength: 1,
    maxlegth: 60,
    label: "until:",
  },
];
const templates = { personalInputs, educationalInputs, workInputs };
export default templates;
