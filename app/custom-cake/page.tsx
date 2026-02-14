import CustomCakePage from "../pages/CustomCakePage";
import appService from "../services/app.service";

export default async function CustomCake() {
  const cakeComponents = await appService.getCakeComponents();
  return <CustomCakePage cakeComponents={cakeComponents} />
}
