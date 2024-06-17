import Card from "react-bootstrap/Card";
import styles from "./NoteList.module.css";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";
import Markdown from "react-markdown";
export default function Note({ noteData }) {
  return (
    <>
      <Card className={styles.card} style={{ width: "21rem", backgroundColor: noteData.color }} as={Link} to={`/notes/${noteData._id}`}>
        <Card.Body>
          <Card.Title>{noteData.title}</Card.Title>
          <Card.Text>
            <Markdown>{noteData.text}</Markdown>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
            {noteData?.tags?.map((tag) => (
              <Badge key={tag} bg="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <Card.Text>Last modified: {noteData.updated}</Card.Text>
        </Card.Footer>
      </Card>
    </>
  );
}
