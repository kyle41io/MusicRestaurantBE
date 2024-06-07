import { dataSource } from "@/config/database/typeorm";
export const createTableConnect = () => {
  dataSource
    .initialize()
    .then(async() => {
      console.log("Connected -duh");
      // await playlistRepository.save({
      //   playlistName: "aaaccc",
      //   userId: 1,
      //   songId: ["a", "b"],
      // });
    })
    .catch(function (error) {
      console.log("Error: ", error);
    });
};
