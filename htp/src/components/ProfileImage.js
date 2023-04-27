import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Image = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-image: ${({ imageURL }) => `url(${imageURL})`};
  background-size: cover;
  background-position: center;
  margin-bottom: 16px;
`;


const Input = styled.input`
  display: none;
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: 500;
  color: #4285f4;
  text-align: center;
  margin-bottom: 24px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;


function ProfileImage({ imageURL, onImageUpload }) {
  return (
    <Container>
      <Image imageURL={imageURL} />
      <Label htmlFor="image-input">Change profile picture</Label>
      <Input type="file" id="image-input" onChange={onImageUpload} />
    </Container>
  );
}

export default ProfileImage;
