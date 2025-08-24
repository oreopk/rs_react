import { type dataType } from "./store/Slice";
export default function Tile({ data }: { data: dataType | null }) {
  return (
    <div className="tile">
      {data ? (
        <div className="tile">
          <div className="row">
            <div className="label">name</div>
            <div className="value">{data.name}</div>
          </div>

          <div className="row">
            <div className="label">age</div>
            <div className="value">{data.age}</div>
          </div>

          <div className="row">
            <div className="label">email</div>
            <div className="value">{data.email}</div>
          </div>

          <div className="row">
            <div className="label">password1</div>
            <div className="value">{data.password1}</div>
          </div>

          <div className="row">
            <div className="label">password2</div>
            <div className="value">{data.password2}</div>
          </div>

          <div className="row">
            <div className="label">gender</div>
            <div className="value">{data.gender}</div>
          </div>

          <div className="row">
            <div className="label">country</div>
            <div className="value">{data.country}</div>
          </div>

          <div className="row">
            <div className="label">terms</div>
            <div className="value">{data.terms}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
