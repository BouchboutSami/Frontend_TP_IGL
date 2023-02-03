/* eslint-disable eqeqeq */
import wilayacommune from "./donnees_communes.json";

const TypeData = [
  { value: "", text: "Type de l'annonce *" },
  { value: "Location", text: "Location" },
  { value: "Vente", text: "Vente" },
  { value: "Location Vacances", text: "Location Vacances" },
  { value: "Echange", text: "Echange" },
];

const TypeBien = [
  { value: "", text: "Type du bien immobillier *" },
  { value: "Appartement", text: "Appartement" },
  { value: "Villa", text: "Villa" },
  { value: "Terrain", text: "Terrain" },
  { value: "Studio", text: "Studio" },
  { value: "Hangar", text: "Hangar" },
  { value: "Niveau de villa", text: "Niveau de villa" },
  { value: "Local", text: "Local" },
];

const wilaya = [{ value: "", text: "Wilaya *" }];
let wilayas = [];
let codeWilaya = [];
wilayacommune.forEach((commune) => {
  if (!(commune.wilaya in wilayas)) wilayas.push(commune.wilaya);
  codeWilaya.push(commune.wilaya_code);
});
wilayas = wilayas.filter((item, index) => wilayas.indexOf(item) === index);
codeWilaya = codeWilaya.filter(
  (item, index) => codeWilaya.indexOf(item) === index
);

wilayas.forEach((w) => {
  wilaya.push({ value: w, text: w });
});

function WilayaToCode(wilaya) {
  let code = 0;
  wilayacommune.forEach((commune) => {
    if (commune.wilaya == wilaya) {
      code = commune.wilaya_code;
    }
  });
  return parseInt(code);
}

const data = [TypeData, TypeBien, wilaya, WilayaToCode];

export default data;
