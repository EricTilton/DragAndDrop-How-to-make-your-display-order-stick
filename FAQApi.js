import Axios from 'axios'
import WebApiUrl from './WebApiUrl';
const BaseUrl = WebApiUrl + "FAQ/"

class FAQApi {

    //getall
    static GetAll(getAllSuccess, error) {
        Axios.get(BaseUrl + "getall", { withCredentials: true })
            .then(getAllSuccess)
            .catch(error)
    }

    //getallwithcategories
    static GetAllWithCategories(getAllSuccess, error) {
        Axios.get(BaseUrl + "getallwithcategories", { withCredentials: true })
            .then(getAllSuccess)
            .catch(error)
    }

    //getbyID
    static GetByID(id, getByIDsuccess, error) {
        Axios.get(BaseUrl + id, { withCredentials: true })
            .then(getByIDsuccess)
            .catch(error);
    }

    //create
    static Insert(data, createSuccess, error) {
        Axios.post(BaseUrl, data, { withCredentials: true })
            .then(createSuccess)
            .catch(error);
    }

    //delete
    static Delete(id, deleteSuccess, error) {
        Axios.delete(BaseUrl + id, { withCredentials: true })
            .then(deleteSuccess)
            .catch(error);
    }

    //edit
    static Put(data, editSuccess, error) {
        Axios.put(BaseUrl + data.id, data, { withCredentials: true })
            .then(editSuccess)
            .catch(error);
    }

    static UpdateDisplay(data, DisplayOrderChangeSuccess, error) {
        Axios.put(BaseUrl + "updateDisplay", data, { withCredentials: true })
            .then(DisplayOrderChangeSuccess)
            .catch(error);
    }
}
export default FAQApi