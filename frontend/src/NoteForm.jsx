import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import axios from "axios";
import { CirclePicker } from "react-color";
import { useSnackbar } from "notistack";

const colors = ["#e0e1dd", "#ef476f", "#ffd166", "#06d6a0", "#118ab2", "#d4a373"];

export default function NoteForm({ formType }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [tags, setTags] = useState([]);
  const [color, setColor] = useState("#e0e1dd");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSubmitCreate = () => {
    const date = new Date();
    const updated = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
    const data = {
      title,
      text,
      updated,
      color,
      tags,
    };
    axios
      .post("http://localhost:3000/createNote", data, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        enqueueSnackbar("Note created successfuly ", { variant: "success" });
        navigate("/notes");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmitEdit = () => {
    const date = new Date();
    const updated = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;

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
  const handleChangeComplete = (color, event) => {
    setColor(color.hex);
  };
  const handleCreatedTag = (createdTags) => {
    const newTags = [];
    createdTags.map((tag) => newTags.push(tag.value));
    setTags(newTags);
  };

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control onChange={(e) => setTitle(e.target.value)} value={title} type="textarea" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Text</Form.Label>
          <Form.Control onChange={(e) => setText(e.target.value)} value={text} as="textarea" rows={3} />
        </Form.Group>

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

        <Form.Group>
          <Form.Label>Pick a Color</Form.Label>
          <CirclePicker circleSize={50} colors={colors} onChangeComplete={handleChangeComplete} />
        </Form.Group>

        {formType === "edit" ? (
          <Button variant="primary" type="button" onClick={handleSubmitCreate}>
            Create
          </Button>
        ) : (
          <Button variant="primary" type="button" onClick={handleSubmitEdit}>
            Submit changes
          </Button>
        )}
      </Form>
    </>
  );
}
