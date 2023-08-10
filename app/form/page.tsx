"use client"
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Favourite, Recommend, Role } from "@prisma/client";
import { favouriteToString, recommendToString, roleToString } from "../../components/db_enums";



export default function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [role, setRole] = useState<Role>(Role.NOT_SELECTED);
  const [recommend, setRecommend] = useState<Recommend>(Recommend.NOT_SELECTED);
  const [favourite, setfavourite] = useState<Favourite>(Favourite.NOT_SELECTED);
  const [improve, setImprove] = useState<string[]>([]);
  const [comment, setComment] = useState("");

  const rolesEnum = [
    Role.NOT_SELECTED,
    Role.STUDENT,
    Role.JOB,
    Role.OTHER,
    Role.PREFER_NOT
  ];

  const recommendEnum = [
    Recommend.YES,
    Recommend.NO,
    Recommend.MAYBE
  ];

  const favouriteEnum = [
    Favourite.NOT_SELECTED,
    Favourite.HAIR,
    Favourite.AESTHETIC,
    Favourite.CODE,
    Favourite.INTERFACE
  ];

  const router = useRouter();
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("Submitting form...");
    const res = await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, age, role, recommend, favourite, improve, comment
      })
    });
    if (res.status == 400) {
      router.push("/error-msg");
    } else {
      router.push("/thanks")
    }
  }

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  const handleAgeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAge(parseInt(event.target.value));
  }

  const handleRoleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setRole(event.target.value as Role);
  }

  const handlefavouriteChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setfavourite(event.target.value as Favourite);
  }

  const handleRecommendChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRecommend(event.target.value as Recommend);
  }

  const handleImproveChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setImprove([...improve, value]);
    } else {
      setImprove(improve.filter((item) => item !== value));
    }
  }

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-neutral-200 w-full mt-12 mx-auto mb-0 sm:max-w-lg md:max-w-2xl">
        <header className="py-0 pt-5 px-2.5 mb-8">
          <h1 id="title" className="text-3xl text-center bold"> how can i improve myself?</h1>
          <p id="description" className="text-center italic">
            well, your task is in the title, right? get crackin'! tell me what i need to improve myself!
          </p>
        </header>

        <form id="survey"
          name="survey"
          onSubmit={handleSubmit}
          className="px-10 py-2.5">
          <div className="mt-0 mb-5 mx-auto">
            <label id="name-label" htmlFor="name"> name </label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={handleNameChange}
              className="block w-full h-9 py-1.5 px-3 text-[#495057] border rounded bg-[#fff]    "
              placeholder="enter your name...please!"
              required
            />
          </div>
          <div className="mt-0 mb-5 mx-auto">
            <label id="email-label" htmlFor="email">email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="block w-full h-9 py-1.5 px-3 text-[#495057] border rounded bg-[#fff]    "
              placeholder="enter your email as well!"
              required
            />
          </div>
          <div className="mt-0 mb-5 mx-auto">
            <label id="age" htmlFor="age">age<span className="ml-1 text-sm">(optional)</span></label>
            <input
              type="number"
              name="age"
              id="age"
              value={age}
              onChange={handleAgeChange}
              min="1"
              max="99"
              className="block w-full h-9 py-1.5 px-3 text-[#495057] border rounded bg-[#fff]"
              placeholder="age"
            />
          </div>
          <div className="mt-0 mb-5 mx-auto">
            <p id="role">which option best describes your current role?
              <span className="ml-1 text-sm"> (sorry if this is a bit nosy :()</span>
            </p>
            <select id="dropdown"
              name="role"
              value={role}
              onChange={handleRoleChange}
              className="block w-full h-9 py-1.5 px-3 text-[#495057] border rounded bg-[#fff]"
              required>
              {rolesEnum.map((role: Role) => {
                return role === Role.NOT_SELECTED ?
                  <option disabled value={role}>{roleToString[role]}</option>
                  :
                  <option value={role}>{roleToString[role]}</option>
              })}
            </select>
          </div>
          <div className="mt-0 mb-5 mx-auto">
            <p>would you recommend me to another friend? without me begging?? </p>
            <ul>
              {recommendEnum.map((rec: Recommend) => {
                return <li key={rec}>
                  <label>
                    <input
                      type="radio"
                      name="recommend"
                      value={rec}
                      checked={recommend === rec}
                      onChange={handleRecommendChange}
                      className="inline-block mr-2.5 min-h-[1] min-w-[1]"
                    />{recommendToString[rec]}
                  </label>
                </li>
              })}
            </ul>
          </div>
          <div className="mt-0 mb-5 mx-auto">
            <p>what do you like about me?<br />
              <span className="text-sm">(no need to hold back cos i need the ego boost)</span>
            </p>
            <select id="like-most"
              name="favourite"
              value={favourite}
              onChange={handlefavouriteChange}
              className="block w-full h-9 py-1.5 px-3 text-[#495057] border rounded bg-[#fff]"
              required>
              {favouriteEnum.map((fav: Favourite) => {
                return fav === Favourite.NOT_SELECTED ?
                  <option disabled value={fav}>{favouriteToString[fav]}</option>
                  :
                  <option value={fav}>{favouriteToString[fav]}</option>
              })}
            </select>
          </div>
          <div className="mt-0 mb-5 mx-auto">
            <p>what improvements do you want to see?<br />
              <span className="text-sm"> (don't be shy, click some more :))))</span>
            </p>
            <ul>
              <li>
                <label>
                  <input
                    type="checkbox"
                    name="improve"
                    value="AUDIO"
                    onChange={handleImproveChange}
                    className="inline-block mr-2.5 min-h-[1] min-w-[1]"
                  />audio in the back of this website?
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="checkbox"
                    name="improve"
                    value="ORIGINAL"
                    onChange={handleImproveChange}
                    className="inline-block mr-2.5 min-h-[1] min-w-[1]"
                  />some originality in the code maybe??
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="checkbox"
                    name="improve"
                    value="APPEARANCE"
                    onChange={handleImproveChange}
                    className="inline-block mr-2.5 min-h-[1] min-w-[1]"
                  />make it look nicer?
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="checkbox"
                    name="improve"
                    value="PERSONALITY"
                    onChange={handleImproveChange}
                    className="inline-block mr-2.5 min-h-[1] min-w-[1]"
                  />your crappy personality :(
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="checkbox"
                    name="improve"
                    value="VALORANT"
                    onChange={handleImproveChange}
                    className="inline-block mr-2.5 min-h-[1] min-w-[1]"
                  />your valorant skills!!!!1! haha i'm running out of ideas so this is what the next option is for
                </label>
              </li>
            </ul>
          </div>
          <div className="mt-0 mb-5 mx-auto">
            <p>any comments or suggestions?<br /><span className="text-sm">do you want to tell me what else to improve? or maybe you want to compliment me more! either way, have at it! </span>
            </p>
            <textarea className="w-full min-h-[100px] p-1 overflow-auto resize border rounded"
              id="comments"
              name="comment"
              value={comment}
              onChange={handleCommentChange}
              maxLength={191}
              placeholder="SPEAK TO ME! TELL ME WHY YOU LOVE THIS! COME TO ME!"></textarea>
          </div>
          <div className="mt-0 mb-5 mx-auto">
            <button type="submit"
              id="submit"
              className="block w-full p-2 bg-[#50845e] rounded-2xl">
              submit
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}