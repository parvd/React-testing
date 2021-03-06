import React, { Component } from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, Button, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Row, Col
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
function RenderDish(dishf) {
  console.log(dishf);
  return (
    <div className="col-12 col-md-5 m-1">
      <Card>
        <CardImg top src={dishf.dish.image} alt={dishf.dish.name} />
        <CardBody>
          <CardTitle>{dishf.dish.name}</CardTitle>
          <CardText>{dishf.dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function RenderComments({ comments, dishId, addComment }) {
  console.log(dishId, addComment)
  if (comments != null) {
    let list = comments.map((comments) => {
      return (
        <li key={comments.id} >
          <div>
            <p>{comments.comment}</p>
            <p>--{comments.author},
              {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comments.date)))}</p>
          </div>
        </li>
      )
    })
    return (
      <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        <ul className="list-unstyled">
          {list}
        </ul>
        <Commentform dishId={dishId} addComment={addComment}>

        </Commentform>
      </div>
    )
  }
  else {
    return (
      <div></div>
    )
  }
}
const Dishdetail = (props) => {
  //console.log(props);
  if (props.dish) {
    return (
      <div className="conatiner">
        <div className="row ml-3">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="row ml-4">
          <h3>{props.dish.name}</h3>
          <hr />
        </div>
        <div className="row">
          <RenderDish {...props} />
          <RenderComments comments={props.comments}
            addComment={props.addComment}
            dishId={props.dish.id}
          />
        </div>


      </div>
    );
  } else return <div></div>;
};
const required = (val) => (val) && (val.length);
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class Commentform extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }
  handleSubmit(values) {
    this.toggleModal();
    this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    console.log(this.props.dishId);
    console.log(values.rating, values.author, values.comment);
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-edit fa-lg" />
          Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label for="rating" md={12}>Rating</Label>
                <Col md={12}>
                  <Control.select model=".rating" id="rating" name="rating" className="form-control">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label for="author" md={12}>Your Name</Label>
                <Col md={12}>
                  <Control.text
                    model=".author" id="author" name="author" placeholder="Your Name"
                    className="form-control"
                    validators={{
                      required, minLength: minLength(3), maxLength: maxLength(15)
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: 'Required',
                      minLength: 'Must be greater than 2 characters',
                      maxLength: 'Must be less than 15 characters'
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label for="comment" md={12}>Comment</Label>
                <Col md={12}>
                  <Control.textarea
                    model=".comment" id="comment" name="comment"
                    className="form-control"
                    resize="none"
                    row="6"
                    validators={{
                      required
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".model"
                    show="touched"
                    messages={{
                      required: 'Required'
                    }}
                  />
                </Col>
              </Row>
              <Button type="submit" value="submit" color="primary">Submit</Button>
            </LocalForm>
          </ModalBody>
        </Modal>

      </div>

    ) 
  }
}

export default Dishdetail;