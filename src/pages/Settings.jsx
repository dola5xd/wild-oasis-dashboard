import Heading from "../ui/Heading.jsx";
import Row from "../ui/Row";
import UptadeSettingsForm from "../features/settings/UpdateSettingsForm";

function Settings() {
  return (
    <Row>
      <Heading as="h1">Update hotel settings</Heading>
      <UptadeSettingsForm />
    </Row>
  );
}

export default Settings;
