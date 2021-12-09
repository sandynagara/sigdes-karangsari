import Peta from "../components/Peta";
import React, { useState, useCallback} from "react";
import Search from "../components/Search";
import NavPeta from "../components/Navigasi/NavPeta";
import SidebarBangunan from "../components/SidebarBangunan";
import Login from "../components/Login";

function Home() {

  const [Nama, setNama] = useState(false);
  const [detail, setDetail] = useState(false);
  const [bangunan, setBangunan] = useState(false);
  const [open, setOpen] = useState("");

  var queryNama = useCallback(
    (e) => {
      setNama(e);
    },
    [Nama]
  );

  return (
      <div>
        <NavPeta open={open} setOpen={(e)=>{setOpen(e)}}/>
        <div style={{ position: "absolute", zIndex: 10000, top: 0,marginLeft:"55px" }}>
          <Search queryNama={queryNama} open={open} setOpen={(e)=>{setOpen(e)}}/>
        </div>
        <SidebarBangunan queryNama={Nama} bangunan={bangunan} open={open} />
        <Peta
          queryNama={Nama}
          queryBangunan={(e) => {
            setBangunan(e);
          }}
          setOpen={(e)=>{setOpen(e)}}
        />
        <Login setOpen={(e)=>{setOpen(e)}}  open={open} />
      </div>
  );
}

export default Home;
