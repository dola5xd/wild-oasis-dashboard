function Option({ children, onChange }) {
  return <option onChange={onChange}>{children}</option>;
}

export default Option;
