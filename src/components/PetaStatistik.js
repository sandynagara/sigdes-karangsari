import React, { useEffect, useState } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import Fade from "react-reveal/Fade";
import "./PetaStatistik.css";
import logoKesehatan from "../icon/kesehatan.png";
import logoPemakaman from "../icon/pemakaman.png";
import logoPemerintahan from "../icon/pemerintahan.png";
import logoBangunan from "../icon/bangunan.png";
import logoPerairan from "../icon/perairan.png";
import logoPeribadatan from "../icon/peribadatan.png";
import logoPendidikan from "../icon/pendidikan.png";
import logoPeople from "../icon/people.png";
import logoPria from "../icon/pria.png";
import logoWanita from "../icon/wanita.png";
import logoTempatUmum from "../icon/tempatumum.png";

function PetaStatistik() {
  const [dataGeojson, setDataGeojson] = useState(false);
  const [dataStatitik, setDataStatitik] = useState();
  const [tipeFilter, setTipeFilter] = useState("desa");

  var Panggil = (cb, url) => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => cb(json));
  };

  var eventHandle = (feature, layer) => {
      function labelPosition(){
        if (tipeFilter == "dusun") {
          layer.bindTooltip(feature.properties.nama, {
            permanent: true,
            className: "label-dusun",
          });
        } else if (tipeFilter == "rt"){
          layer.bindTooltip(feature.properties.nama, {
            direction: 'left',
            permanent: true,
            className: "label-rt",
            sticky: true,
            opacity: 0.75,
          });
          layer.bindTooltip(feature.properties.nama, {
            direction: 'right',
            permanent: true,
            className: "label-rt",
          });
        }
      }
      labelPosition()
      layer.on({
        mouseover: () => (
          layer.setStyle({ 
            weight: 5,
            color: "blue",
            fillOpacity: 0.5,
          }),
          layer.bringToFront()
        ),
        mouseout: () => layer.setStyle(style),
        click: () => {
          var url =
            "http://localhost:5000/api/" +
            tipeFilter +
            "/" +
            feature.properties.nama;
          Panggil((result) => {
            var json = {
              dusun: feature.properties.nama,
              data: result[0],
              feature: feature,
            };
            console.log(json);
            setDataStatitik(json);
          }, url);
        },
      });
  };

  const style = {
    weight: 2,
    color: "white",
    fillOpacity: 0,
  };

  useEffect(() => {

    if (tipeFilter == "desa") {
      var urlData = "http://localhost:5000/api/desa/data";
      Panggil((result) => {
        var json = {
          data: result[0],
        };
        setDataStatitik(json);
      }, urlData);
    }
  }, [tipeFilter]);

  useEffect(() => {
    var urlDesa = "http://localhost:5000/api/" + tipeFilter;
    Panggil((result) => {
      setDataGeojson(result);
    }, urlDesa);
  }, [tipeFilter]);

  var SelectedLayer = () => {
    return (
      <GeoJSON
        data={dataStatitik.feature}
        style={{ color: "yellow" }}
        bringToFront={true}
      />
    );
  };

  var tipe = (e) => {
    setTipeFilter(e);
  };

  var GeojsonHandler = () => {
    var geojson;
    if (tipeFilter == "desa") {
      geojson = <GeoJSON data={dataGeojson} style={style} />;
    } else {
      geojson = (
        <GeoJSON data={dataGeojson} onEachFeature={eventHandle} style={style} />
      );
    }

    return geojson;
  };

  return (
    <div id="Statistik">
      <div className="container-peta">
        <p style={{ color: "white", fontSize: "20px" }}>_____</p>
        <h5 style={{ color: "white", fontSize: "40px" }}>
          {" "}
          Statistik Desa Karangsari
        </h5>
        <TipeStatistik tipe={tipe} tipeFillter={tipeFilter} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <MapContainer
            center={[-7.83920975, 110.138661812]}
            zoom={14}
            maxZoom={14}
            minZoom={14}
            dragging={false}
            zoomControl={false}
            touchZoom={false}
            className="peta-statistik"
          >
            {dataGeojson ? <GeojsonHandler /> : ""}
            {dataStatitik && tipeFilter == "dusun" || tipeFilter == "rt" ? <SelectedLayer /> : ""}
          </MapContainer>
          <div className="data-peta-statistik">
            {dataStatitik ? <ListStatistikPeta data={dataStatitik.data} /> : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetaStatistik;

function ItemStatistikPeta({ data, jenis, delay }) {
  var logoStatistik = (keterangan) => {
    var logo;
    switch (keterangan) {
      case "People":
        logo = logoPeople;
        break;
      case "Laki Laki":
        logo = logoPria;
        break;
      case "Perempuan":
        logo = logoWanita;
        break;
      case "Pendidikan":
        logo = logoPendidikan;
        break;
      case "Peribadatan":
        logo = logoPeribadatan;
        break;
      case "Perairan":
        logo = logoPerairan;
        break;
      case "Pemakaman":
        logo = logoPemakaman;
        break;
      case "Kesehatan":
        logo = logoKesehatan;
        break;
      case "Bangunan":
        logo = logoBangunan;
        break;
      case "Pemerintahan":
        logo = logoPemerintahan;
        break;
      case "Tempat Umum":
        logo = logoTempatUmum;
        break;
      default:
        logo = logoPeople;
    }
    return logo;
  };

  var logo = logoStatistik(jenis);
  return (
    <Fade right delay={delay}>
      <div className="data-logo">
        <img src={logo} />
        {data ? (
          <h6 style={{ fontSize: "30px", marginTop: "10px" }}> {data}</h6>
        ) : (
          ""
        )}
        <p>{jenis}</p>
      </div>
    </Fade>
  );
}

function ListStatistikPeta({ data }) {
  return (
    <div className="data-statistik-peta">
      <h5 style={{ textAlign: "left", color: "white" }}>
        <b>Kependudukan</b>
      </h5>

      <div className="list-item-statistik">
        <ItemStatistikPeta
          data={data.bangunan}
          delay={0}
          jenis="Jumlah Penduduk"
        />
        {/* <ItemStatistikPeta data={data.bangunan} delay={200} jenis="Laki Laki"/>
            <ItemStatistikPeta data={data.bangunan} delay={400} jenis="Perempuan"/> */}
      </div>

      <h5 style={{ textAlign: "left", color: "white", marginTop: "20px" }}>
        <b>Fasilitas Umum</b>
      </h5>
      <div className="list-item-statistik">
        {data.fasum != null ? (
          data.fasum.map((e, index) => {
            var stat = e.jsonb_build_object;
            return (
              <ItemStatistikPeta
                data={stat.jumlah}
                delay={index * 200}
                jenis={stat.kategori}
              />
            );
          })
        ) : (
          <ItemStatistikPeta data="0" jenis="Fasilitas Umum" />
        )}
      </div>
      <h5 style={{ textAlign: "left", color: "white", marginTop: "20px" }}>
        <b>Administrasi</b>
      </h5>
    </div>
  );
}

function TipeStatistik({ tipe, tipeFillter }) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        className="tipeStatistik"
        style={
          tipeFillter == "desa"
            ? { borderColor: "yellow", color: "yellow" }
            : {}
        }
        onClick={() => tipe("desa")}
      >
        Desa
      </div>
      <div
        className="tipeStatistik"
        style={
          tipeFillter == "dusun"
            ? { borderColor: "yellow", color: "yellow" }
            : {}
        }
        onClick={() => tipe("dusun")}
      >
        Dusun
      </div>
      <div
        className="tipeStatistik"
        style={
          tipeFillter == "rt" ? { borderColor: "yellow", color: "yellow" } : {}
        }
        onClick={() => tipe("rt")}
      >
        RT
      </div>
    </div>
  );
}
