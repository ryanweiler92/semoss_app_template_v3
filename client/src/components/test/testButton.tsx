import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { Button } from "../../@providers/components/ui/button";

const TestButton = observer(() => {
  const logData = async () => {
    try {
      console.log("Test Button");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return <Button onClick={logData}>Test</Button>;
});

export default TestButton;
