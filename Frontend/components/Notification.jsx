import React from "react";
import "./Notification.css";
import NoteCard from "../components/NoteCard";
import "./Notecard.css";
import SVGComponent from "./Epingle";

const Notes = (props) => {
  return (
    <>
      <div className="Notes">
        <div className="Note">
          <div className="Note-header">
            <div className="Note-avatar"></div>
            <div className="Note-title">Vous</div>
            <div className="Post_title">
              <h4>Note Title</h4>
            </div>
            <div className="Note-pin">
              <SVGComponent ispang={props.ispang} />
            </div>
          </div>
          <div>
            <div className="Post_Content">
              <p>
                {" "}
                Nous souhaitons vous informer de quelques changements importants
                concernant les procédures de télétravail qui entreront en
                vigueur à partir du [Date de Mise en Application]. Ces
                ajustements visent à améliorer notre flexibilité tout en
                maintenant notre efficacité opérationnelle.
              </p>
              <p>
                {""}
                Nous souhaitons vous informer de quelques changements importants
                concernant les procédures de télétravail qui entreront en
                vigueur à partir du [Date de Mise en Application]. Ces
                ajustements visent à améliorer notre flexibilité tout en
                maintenant notre efficacité opérationnelle.
              </p>
              <p>
                {""}
                Nous souhaitons vous informer de quelques changements importants
                concernant les procédures de télétravail qui entreront en
                vigueur à partir du [Date de Mise en Application]. Ces
                ajustements visent à améliorer notre flexibilité tout en
                maintenant notre efficacité opérationnelle.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notes;
