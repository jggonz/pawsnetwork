import { SITTERS } from './data.js';
import BookingWidget from './BookingWidget.jsx';

function getSitter() {
  const id = new URLSearchParams(window.location.search).get('id');
  return SITTERS.find((s) => s.id === id) || SITTERS[0];
}

function sitterToBrand(s) {
  const initials = (s.monogram || s.name.replace(/[^A-Z]/g, '')).slice(0, 3);
  return { name: s.name, initials, accent: s.accent };
}

export default function Profile() {
  const sitter = getSitter();
  return (
    <div className="bw-fullpage">
      <BookingWidget brand={sitterToBrand(sitter)} />
    </div>
  );
}
