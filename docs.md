Post 33:
containers/Auth/Login.js -> containers/App.js

Post: 36:
axios (Tạo XMLHttpRequests từ trình duyệt
Thực hiện các yêu cầu http từ node.js,
Hỗ trợ API Promise,
Yêu cầu chặn và phản hồi,
Chuyển đổi dữ liệu yêu cầu và phản hồi,
Hủy yêu cầu,
Biến đổi tự động cho dữ liệu JSON,
🆕Tự động tuần tự hóa đối tượng dữ liệu multipart/form-datavà x-www-form-urlencodedmã hóa nội dung) -> axios.js

Post: 38
Redux -> store/actions and reducer
-get API from services/userService.js -> axios

- manage user: -> system/UserManage.js
  - import { getAllUsers } from "../../services/userService" (get db(API))

* ctrl - p (fast found file)

- emitter utils/emitter.js (use to call conponent from parent to child and reverse)

- react-slick (library: slider)

* hidden thanh scroll = (
  a {
  overflow-y: hidden;
  overflow-x: auto;
  }
  a::-webkit-scrollbar {
  display: none;
  }
  )

* Conver placeholder language =
  <FormattedMessage id="yourid" defaultMessage="search">
  {placeholder=>  
   <Input placeholder={placeholder}/>
  }
  </FormattedMessage>

Post 57: REDUX

- Redux(Actions, Reducers)

Post 58:

- do with input image: use label load image instead of input

* <input id="prev-image" hidden type="file" />
* <label htmlFor="prev-image">down image</label>

- npm i react-image-lightbox (use phong to image)

POST 62: save image with base64

- create:
  static getBase64(file) {
  return new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = (error) => reject(error);
  });
  }
- use
  let base64 = await CommonUtils.getBase64(file);

POST 67:

- Edit text(react-markdown-editor-lite)
- select infor(react-select)
- choose date (datePicker)
- format ngay thang nam (moment)
- find value co trung nhau hay khong (lodash)
- format number (react-number-format)
- use Modal in (reactstrap)

# create router

- App.js(create router)
- ex: <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />//path in file constant.js, component is name file render ex: DetailDoctor.js
- create constant:
  export const path = {
  DETAIL_DOCTOR: "/detail-doctor/:id"//path url
  }
- create handle onClick
  - import {withRouter} from 'react-router'
  - Add:
    export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Speciality)
    );
  - Create onclick:
    handleViewDetailSpecialty = (item) => {
    if (this.props.history) {
    this.props.history.push(`detail-specialty/${item.id}`);//path
    }
    }
  - Add attribute onclick in item:
    onClick={() => this.handleViewDetailSpecialty(item)}


* create page manage patient for doctor
 - menuApp.js (create path)
 - declare translate in file vi.js and en.js
 - App.js (find path to '/doctor' component: Doctor)
 - declare Router for patient manage
 - create PatientManage.js (build pages manage in UI)
 