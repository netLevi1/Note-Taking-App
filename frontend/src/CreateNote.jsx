import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import CreatableSelect from "react-select/creatable";
import axios from "axios";
import { useSnackbar } from "notistack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Circle from "@uiw/react-color-circle";
import { useAuth } from "./AuthContext";

export default function CreateNote() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [tags, setTags] = useState([]);
  const [color, setColor] = useState("#e0e1dd");
  const [hex, setHex] = useState("#e0e1dd");
  const { enqueueSnackbar } = useSnackbar();
  const { isLoggedIn } = useAuth();

  const handleSubmitCreate = () => {
    if (title.length === 0 && text.length === 0) {
      enqueueSnackbar("Note must have title or text", { variant: "error" });
      return;
    }

    const updated = Date.now();
    const data = {
      title,
      text,
      updated,
      color,
      tags,
    };
    axios
      .post("http://localhost:3000/notes", data, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        enqueueSnackbar("Note created successfuly ", { variant: "success" });
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

  if (!isLoggedIn) {
    return <h1 style={{ padding: "30px" }}>Please login to create new notes</h1>;
  }

  return (
    <Container>
      <Row>
        <h1>Create New Note:</h1>
        <br />
      </Row>

      <Form style={{ width: "40rem" }}>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="Form">
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
          <Form.Group className="mb-3" controlId="Form">
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
          <Button variant="primary" type="button" onClick={handleSubmitCreate}>
            Create
          </Button>
        </Row>
      </Form>
    </Container>
  );
}
