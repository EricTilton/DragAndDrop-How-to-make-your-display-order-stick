import React from 'react';
import FAQApi from '../../../api/FAQApi'
import Dragula from 'react-dragula'
import $ from 'jquery'
import './FAQList.css'


class FAQList extends React.Component {
  //constructor
  constructor(props) {
    super(props);
    this.state = {
      modalid: "",
      modalcategory: "",
      modalquestion: "",
      modalanswer: "",
      modaldisplay: "",
      items: [],
      id: "",
      deleteId: "",
      categoryId: "",
      question: "",
      answer: "",
      displayOrder: "",
      modifiedBy: "Me",
      order: "",
      changes: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.modalChange = this.modalChange.bind(this);
    this.getAllWithCategoriesSuccess = this.getAllWithCategoriesSuccess.bind(this);
    this.getByIDsuccess = this.getByIDsuccess.bind(this);
    this.editSuccess = this.editSuccess.bind(this);
    this.DisplayOrderChangeSuccess = this.DisplayOrderChangeSuccess.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.success = this.success.bind(this)
    this.delete = this.delete.bind(this)
    this.deleter = this.deleter.bind(this);
    this.dragulaDecorator = this.dragulaDecorator.bind(this)
  };

  //didMount
  componentDidMount() {
    FAQApi.GetAllWithCategories(this.getAllWithCategoriesSuccess, this.error);
  };

  //success
  getByIDsuccess(response) {
    this.setState({
      modalid: response.data.item.id,
      modalcategory: response.data.item.categoryId,
      modalquestion: response.data.item.question,
      modalanswer: response.data.item.answer,
      modaldisplay: response.data.displayOrder
    });
  };

  success(response) {
  };

  getAllWithCategoriesSuccess(response) {
    this.setState({
      ...this.state,
      items: response.data.items
    });
  };

  editSuccess(response) {
    window.location.reload();
  };

  DisplayOrderChangeSuccess(response) {
  };

  deleteSuccess(response) {
    window.location.reload();
  };

  //error
  error(resp) {
  };

  //clear
  clear = () => {
    this.setState({
      modalcategory: "",
      modalquestion: "",
      modalanswer: "",
      modaldisplay: ""
    });
  };

  //handleChange
  handleChange = e => {
    let key = e.target.name;
    let val = e.target.value;

    this.setState({
      ...this.state,
      [key]: val,

    });
    var id = val;
    FAQApi.GetByID(id, this.getByIDsuccess, this.error);
  };

  delete = e => {
    let key = e.target.name;
    let val = e.target.value;

    this.setState({
      ...this.state,
      [key]: val,
      deleteId: val
    });
  };

  deleter() {
    var deleteId = this.state.deleteId;
    FAQApi.Delete(deleteId, this.deleteSuccess, this.error);
  };

  modalChange = e => {
    let key = e.target.name;
    let val = e.target.value;

    this.setState({
      ...this.state,
      [key]: val,
    });
  };

  //onSubmit
  onSubmit = e => {

    const data = {
      id: this.state.modalid,
      categoryID: this.state.modalcategory,
      question: this.state.modalquestion,
      answer: this.state.modalanswer,
      displayOrder: this.state.modaldisplay,
      modifiedBy: "Me"
    };
    if (this.state.modalcategory === "") {
      alert("Please enter a Category ID")
    }
    if (this.state.modalquestion === "") {
      alert("Please enter a Question")
    }
    if (this.state.modalanswer === "") {
      alert("Please enter an answer")
    }
    else {
      FAQApi.Put(data, this.editSuccess, this.error);
    };
  };

  //dragula
  dragulaDecorator = (componentBackingInstance) => {
    if (componentBackingInstance) {
      let options = {};

      const dragula = Dragula([componentBackingInstance], options);
      dragula.on('drop', (el, target, source, sibling) => {

        this.setState({
          ...this.state,
          changes: [],

        });

        for (var i = 0; i < target.children.length; i++) {

          var id = target.children[i].className.substring(0, 4)
          this.state.changes.push(id, i)
        }

        for (var i = 0; i < target.children.length; i++) {

          var slice = this.state.changes.splice(0, 2)
          var id = slice[0]
          var displayOrder = slice[1]
          var data = [{ Id: id, DisplayOrder: displayOrder }]
          FAQApi.UpdateDisplay(data, this.DisplayOrderChangeSuccess, this.error);
        }
      })
    };
  };

  render() {
    return (

      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <h1 className='col-md-4 offset-md-4 bg-dark text-white g-rounded-30'>FAQ List</h1>
        <br />
        <br />
        <br />
        <br />

        <div className='border-top'>
          {this.state.items.map((categoryItem, categoryIndex) => (
            <div key={categoryIndex} id={categoryItem.id}>
              <br />
              <h2 className="g-font-weight-600 text-uppercase mb-2">{categoryItem.displayName}</h2>
              <ol>
                <br />
                <br />
                <div className="row justify-content-center">

                  <div ref={this.dragulaDecorator} className="col-lg-10">

                    {/*CategoryQuestion*/}
                    {!categoryItem.faqList || categoryItem.faqList.map((faqItem, faqIndex) => (
                      <div key={faqIndex} value={faqIndex} id={faqIndex + '   accordian' + faqItem.displayOrder} className={faqItem.id} role="tablist" aria-multiselectable="true">
                        <p>{""}</p>
                        <p>{""}</p>
                        <div value={faqIndex}>

                          <div id={faqItem.question} className="g-brd-bottom g-brd-gray-light-v4 g-pa-0" role="tab">
                            <h5 className="mb-0">

                              <a className="collapsed d-flex justify-content-between g-color-main g-text-underline--none--hover rounded-0 g-px-5 g-py-20" href={"#" + faqItem.id} data-toggle="collapse" data-parent={'#' + faqIndex + '   accordian'} aria-expanded="false" aria-controls="accordion-body-01">
                                <i className="fa fa-bars g-color-gray-dark-v4 g-pa-30">
                                  {' '}
                                  <span />
                                  <font className="g-font-weight-600 g-color-black g-pa-30" face="Sans-serif">{faqItem.question}</font>
                                </i>
                                <div className="float-right">
                                  <button data-toggle="modal" onClick={this.handleChange} value={faqItem.id} data-target="#EditModal" className='btn btn-sm u-btn-outline-darkgray u-btn-hover-v1-1  g-rounded-30'>Edit</button>
                                  {' '}
                                  <button data-toggle="modal" onClick={this.delete} value={faqItem.id} data-target="#DeleteModal" className='btn btn-sm u-btn-outline-darkgray u-btn-hover-v1-1  g-rounded-30'>Delete</button>
                                  {' '}
                                  <span className="u-accordion__control-icon">
                                    <i className="fa fa-angle-down"></i>
                                    <i className="fa fa-angle-up"></i>
                                  </span>
                                </div>
                              </a>
                            </h5>
                          </div>

                          {/*CategoryAnswers*/}
                          <div id={faqItem.id} className="collapse" role="tabpanel" aria-labelledby={faqItem.id} data-parent="#accordion">
                            <div value={faqIndex} className="u-accordion__body g-color-gray-dark-v4 g-pa-30">
                              {faqItem.answer}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ol>
            </div>
          ))}
        </div>

        {/*DeleteModal*/}
        <div className="modal fade" id="DeleteModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Delete</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Delete this FAQ?
                  </div>

              {/*modalyes&&nobuttons*/}
              <div className="modal-footer">
                <button className='btn u-btn-outline-darkgray u-btn-hover-v1-1 g-rounded-30 col-md-3' type="submit" onClick={this.deleter} data-dismiss="modal">Yes</button>
                <button type="button" className='btn u-btn-outline-darkgray u-btn-hover-v1-1 g-rounded-30 col-md-3' data-dismiss="modal">No</button>
              </div>
            </div>
          </div>
        </div>

        {/*EditModalHead*/}
        <form id="editFAQ">
          <div className="modal fade" id="EditModal" tabIndex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="ModalLabel">Edit</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>

                {/*EditModalBody*/}
                <div className="modal-body">
                  <br />
                  <div>
                    <input hidden name="modalid" type="number" className="form-control" value={this.state.modalid} placeholder="Id" id="Id"></input>
                    <br />
                    <select name="modalcategory" value={this.state.modalcategory} onChange={this.modalChange} className="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
                      <option value="1" select={this.state.modalcategory.toString()}>Legal</option>
                      <option value="2" select={this.state.modalcategory.toString()}>Regional</option>
                      <option value="3" select={this.state.modalcategory.toString()}>Political</option>
                      <option value="4" select={this.state.modalcategory.toString()}>About Us</option>
                      <option value="5" select={this.state.modalcategory.toString()}>How to use this site (Search, Join, Connect, etc)</option>
                      <option value="6" select={this.state.modalcategory.toString()}>Hot Issues</option>
                      <option value="7" select={this.state.modalcategory.toString()}>Education</option>
                    </select>
                    <br />
                    <br />
                    <input required name="modalquestion" type="text" onChange={this.modalChange} className="form-control" value={this.state.modalquestion} placeholder="Question" id="question"></input>
                    <br />
                    <textarea required name="modalanswer" placeholder="Answer" onChange={this.modalChange} value={this.state.modalanswer} className="form-control" rows="5" id="answer"></textarea>
                    <br />
                  </div>

                  {/*EditModalFooter*/}
                </div>
                <div className="modal-footer">
                  <button type="button" className='btn u-btn-outline-darkgray u-btn-hover-v1-1 g-rounded-30 col-md-3' data-dismiss="modal">Close</button>
                  <button type="button" onClick={this.clear} className='btn u-btn-outline-darkgray u-btn-hover-v1-1 g-rounded-30 col-md-3'>Clear</button>
                  <button type="button" onClick={this.onSubmit} className='btn u-btn-outline-darkgray u-btn-hover-v1-1 g-rounded-30 col-md-3'>Save changes</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default FAQList;
