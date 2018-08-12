function engageGear(gear) {
    if (gear === "R") { console.log("Reversing"); }
    if (gear === "D") { console.log("Driving"); }
    if (gear === "N") { console.log("Neutral/Parking"); }
    throw new Error("Invalid Gear State");
}
try {
    engageGear("R"); //Reversing
    engageGear("P"); //Invalid Gear State
}
catch (e) {
    console.log(e.message);
}