import React from 'react';
import '../style/Noteard.css';
import { GiPin } from "react-icons/gi";

const NoteCard = () => {
  return (
    <div className="note-card">
      <div className="note-title">Note Title<GiPin /></div>
      <div className="note-content">
        Nous souhaitons vous informer de quelques changements importants concernant les procédures de télétravail qui entreront en vigueur à partir du [Date de Mise en Application]. Ces ajustements visent à améliorer notre flexibilité tout en maintenant notre efficacité opérationnelle.
      </div>
    </div>
  );
};

export default NoteCard;
