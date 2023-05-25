import React from 'react';
import { useParams } from 'react-router-dom';
import DocHeader from '../Components/DocHeader';

function Doc() {
  const { id } = useParams();

  return (
    <div>
      <DocHeader docId={id} />
    </div>
  );
}

export default Doc;
