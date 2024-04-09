import Cookies from "js-cookie";
import { myProfile } from "../../services/ApiServices";

const checkUserFullNameExist = async () => {
    try {
        const response = await myProfile(Cookies.get('userId'));
        if (response.status === 200) {
          const fullname = response.data?.lastName + response.data?.firstName;
          Cookies.set('userFullname', fullname, { expires: 7 });
        }
      } catch (error) {

      }
  }

export {checkUserFullNameExist};