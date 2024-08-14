import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { useSnackbar } from "notistack";
import CreatableSelect from "react-select/creatable";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Circle from "@uiw/react-color-circle";

export default function EditNote() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [color, setColor] = useState("#e0e1dd");
  const [hex, setHex] = useState("#e0e1dd");
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  const handleSubmitEdit = () => {
    const updated = Date.now();

    const data = {
      title,
      text,
      updated,
      color,
      tags,
    };
    axios
      .put(`http://localhost:3000/notes/${id}/editNote`, data, { withCredentials: true })
      .then((res) => {
        enqueueSnackbar("Note updated successfuly ", { variant: "success" });
        navigate("/notes");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCreatedTag = (createdTags) => {
    const newTags = [];
    createdTags.map((tag) => newTags.push(tag.value));
    setTags(newTags);
  };
  return (
    <Container>
      <Row>
        {loading && <Spinner animation="border" variant="primary" />}
        <h1>Edit Note:</h1>
      </Row>
      {useEffect(() => {
        setLoading(true);
        axios
          .get(`http://localhost:3000/notes/${id}`, { withCredentials: true })
          .then((res) => {
            setTitle(res.data.title);
            setText(res.data.text);
            setColor(res.data.color);
            setHex(res.data.color);
            setTags(res.data.tags);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      }, [])}
      <Form style={{ width: "40rem" }}>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control onChange={(e) => setTitle(e.target.value)} value={title} type="textarea" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Tags</Form.Label>
              <CreatableSelect
                isMulti
                onChange={handleCreatedTag}
                value={tags.map((tag) => {
                  return { label: tag, value: tag };
                })}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Text</Form.Label>
            <Form.Control onChange={(e) => setText(e.target.value)} value={text} as="textarea" rows={8} />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group style={{ padding: "20px" }}>
            <Form.Label>Pick a Color</Form.Label>

            <Circle
              style={{ padding: "30px" }}
              colors={["#e0e1dd", "#EE4E4E", "#ffd166", "#06d6a0", "#5BBCFF", "#d4a373"]}
              color={hex}
              onChange={(color) => {
                setHex(color.hex);
                setColor(color.hex);
              }}
              pointProps={{
                style: {
                  display: "flex",
                  justifyContent: "center",
                  width: "80px",
                  height: "70px",
                },
              }}
            />
          </Form.Group>
        </Row>
        <Row>
          <Button variant="primary" type="button" onClick={handleSubmitEdit}>
            Submit changes
          </Button>
        </Row>
      </Form>
    </Container>
  );
}
