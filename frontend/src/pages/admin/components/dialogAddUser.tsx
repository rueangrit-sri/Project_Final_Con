import { Text, Dialog, Button, Flex, TextField, Select } from "@radix-ui/themes";
import { postUser } from "@/services/user.service";
import { getRole } from "@/services/role.service";
import { getProject } from "@/services/project.service";
import { useEffect, useState } from "react";

type DialogUserProps = {
  getUserData: Function;
};

const DialogAdd = ({ getUserData }: DialogUserProps) => {
  const [postUserName, setPostUserName] = useState("");
  const [postPassword, setPostPassword] = useState("");
  const [postRole, setPostRole] = useState("");
  const [postProject, setPostProject] = useState("");
  const [roles, setRoles] = useState<{ role_id: string; name: string }[]>([]);
  const [projects, setProjects] = useState<{ project_id: string; project_name: string }[]>([]);
  const [loadingRoles, setLoadingRoles] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(false);

  // Fetch roles on component load
  useEffect(() => {
    const fetchRoles = async () => {
      setLoadingRoles(true);
      try {
        const response = await getRole();
        console.log("Roles:", response.responseObject); // Debugging roles
        if (response.success) {
          setRoles(response.responseObject);
        } else {
          alert("Failed to fetch roles: " + response.message);
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
        alert("Error fetching roles. Please try again.");
      } finally {
        setLoadingRoles(false);
      }
    };
    fetchRoles();
  }, []);

  // Fetch projects on component load
  useEffect(() => {
    const fetchProjects = async () => {
      setLoadingProjects(true);
      try {
        const response = await getProject();
        console.log("Projects:", response.responseObject); // Debugging projects
        if (response.success) {
          setProjects(response.responseObject);
        } else {
          alert("Failed to fetch projects: " + response.message);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        alert("Error fetching projects. Please try again.");
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchProjects();
  }, []);

  const handleCreateUser = async () => {
    if (!postUserName || !postPassword || !postRole || !postProject) {
      alert("Please enter all required fields (username, password, role, and project).");
      return;
    }
    try {
      const response = await postUser({
        username: postUserName,
        password: postPassword,
        role: postRole,
        project_name: postProject,
      });
      if (response.statusCode === 200) {
        setPostUserName("");
        setPostPassword("");
        setPostRole("");
        setPostProject("");
        getUserData(); // Refresh user data
        alert("User created successfully!");
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user. Please try again.");
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button size="1">Create</Button>
      </Dialog.Trigger>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Create User</Dialog.Title>
        <Flex direction="column" gap="3">
          {/* Username */}
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Username
            </Text>
            <TextField.Root
              value={postUserName}
              placeholder="Enter username"
              onChange={(event) => setPostUserName(event.target.value)}
            />
          </label>
          {/* Password */}
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Password
            </Text>
            <TextField.Root
              value={postPassword}
              placeholder="Enter password"
              type="password"
              onChange={(event) => setPostPassword(event.target.value)}
            />
          </label>
          {/* Role */}
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Role
            </Text>
            {loadingRoles ? (
              <Text>Loading roles...</Text>
            ) : (
              <Select.Root
                size="2"
                value={postRole}
                onValueChange={(value) => setPostRole(value)}
              >
                <Select.Trigger>
                  {roles.find((role) => role.role_id === postRole)?.name || "Select a role"}
                </Select.Trigger>
                <Select.Content>
                  {roles.map((role) => (
                    <Select.Item key={role.role_id} value={role.role_id}>
                      {role.name}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            )}
          </label>
          
          {/* Project */}
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Project
            </Text>
            {loadingProjects ? (
              <Text>Loading projects...</Text>
            ) : (
              <Select.Root
                size="2"
                value={postProject}
                onValueChange={(value) => setPostProject(value)}
              >
                <Select.Trigger>
                  {projects.find((project) => project.project_id === postProject)?.project_name || "Select a Project"}
                </Select.Trigger>
                <Select.Content>
                  {projects.map((project) => (
                    <Select.Item key={project.project_id} value={project.project_id}>
                      {project.project_name}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            )}
          </label>
        </Flex>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Button onClick={handleCreateUser}>Save</Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default DialogAdd;

// import { Text, Dialog, Button, Flex, TextField, Select } from "@radix-ui/themes";
// import { postUser } from "@/services/user.service";
// import { getRole } from "@/services/role.service";
// import { getProject } from "@/services/project.service";
// import { useEffect, useState } from "react";

// // ประเภทของ props ที่จะส่งเข้าไปใน DialogAdd
// type DialogUserProps = {
//   getUserData: Function; // ฟังก์ชันสำหรับรีเฟรชข้อมูลผู้ใช้หลังจากสร้างผู้ใช้ใหม่
// };

// // คอมโพเนนต์ DialogAdd สำหรับสร้างผู้ใช้ใหม่
// const DialogAdd = ({ getUserData }: DialogUserProps) => {
//   // เก็บข้อมูล state ที่เกี่ยวข้องกับฟอร์ม
//   const [postUserName, setPostUserName] = useState("");
//   const [postPassword, setPostPassword] = useState("");
//   const [postRole, setPostRole] = useState("");
//   const [postProject, setPostProject] = useState("");
//   const [roles, setRoles] = useState<{ role_id: string; name: string }[]>([]);
//   const [projects, setProjects] = useState<{ project_id: string; project_name: string }[]>([]);
//   const [loadingRoles, setLoadingRoles] = useState(false);
//   const [loadingProjects, setLoadingProjects] = useState(false);

//   // ดึงข้อมูล role เมื่อโหลดคอมโพเนนต์
//   useEffect(() => {
//     const fetchRoles = async () => {
//       setLoadingRoles(true);
//       try {
//         const response = await getRole(); // เรียก API เพื่อดึงข้อมูล role
//         console.log("Roles:", response.responseObject); // Debugging: แสดงข้อมูล roles
//         if (response.success) {
//           setRoles(response.responseObject); // เก็บข้อมูล role ใน state
//         } else {
//           alert("Failed to fetch roles: " + response.message);
//         }
//       } catch (error) {
//         console.error("Error fetching roles:", error);
//         alert("Error fetching roles. Please try again.");
//       } finally {
//         setLoadingRoles(false);
//       }
//     };
//     fetchRoles();
//   }, []);

//   // ดึงข้อมูล project เมื่อโหลดคอมโพเนนต์
//   useEffect(() => {
//     const fetchProjects = async () => {
//       setLoadingProjects(true);
//       try {
//         const response = await getProject(); // เรียก API เพื่อดึงข้อมูล project
//         console.log("Projects:", response.responseObject); // Debugging: แสดงข้อมูล projects
//         if (response.success) {
//           setProjects(response.responseObject); // เก็บข้อมูล project ใน state
//         } else {
//           alert("Failed to fetch projects: " + response.message);
//         }
//       } catch (error) {
//         console.error("Error fetching projects:", error);
//         alert("Error fetching projects. Please try again.");
//       } finally {
//         setLoadingProjects(false);
//       }
//     };
//     fetchProjects();
//   }, []);

//   // ฟังก์ชันสำหรับสร้างผู้ใช้ใหม่
//   const handleCreateUser = async () => {
//     // ตรวจสอบว่ากรอกข้อมูลครบหรือไม่
//     if (!postUserName || !postPassword || !postRole || !postProject) {
//       alert("Please enter all required fields (username, password, role, and project).");
//       return;
//     }

//     try {
//       // ส่งข้อมูลไปยัง API
//       const response = await postUser({
//         username: postUserName,
//         password: postPassword,
//         role: postRole,
//         project_name: postProject,
//       });

//       // ตรวจสอบสถานะของการตอบกลับ
//       if (response.statusCode === 200) {
//         // ล้างข้อมูลในฟอร์ม
//         setPostUserName("");
//         setPostPassword("");
//         setPostRole("");
//         setPostProject("");
//         getUserData(); // รีเฟรชข้อมูลผู้ใช้
//         alert("User created successfully!");
//       } else {
//         alert(response.message);
//       }
//     } catch (error) {
//       console.error("Error creating user:", error);
//       alert("Failed to create user. Please try again.");
//     }
//   };

//   // ส่วน UI ของฟอร์มสร้างผู้ใช้
//   return (
//     <Dialog.Root>
//       <Dialog.Trigger>
//         <Button size="1">Create</Button>
//       </Dialog.Trigger>
//       <Dialog.Content maxWidth="450px">
//         <Dialog.Title>Create User</Dialog.Title>
//         <Flex direction="column" gap="3">
//           {/* ฟิลด์ Username */}
//           <label>
//             <Text as="div" size="2" mb="1" weight="bold">
//               Username
//             </Text>
//             <TextField.Root
//               value={postUserName}
//               placeholder="Enter username"
//               onChange={(event) => setPostUserName(event.target.value)}
//             />
//           </label>
//           {/* ฟิลด์ Password */}
//           <label>
//             <Text as="div" size="2" mb="1" weight="bold">
//               Password
//             </Text>
//             <TextField.Root
//               value={postPassword}
//               placeholder="Enter password"
//               type="password"
//               onChange={(event) => setPostPassword(event.target.value)}
//             />
//           </label>
//           {/* ฟิลด์ Role */}
//           <label>
//             <Text as="div" size="2" mb="1" weight="bold">
//               Role
//             </Text>
//             {loadingRoles ? (
//               <Text>Loading roles...</Text>
//             ) : (
//               <Select.Root
//                 size="2"
//                 value={postRole}
//                 onValueChange={(value) => setPostRole(value)}
//               >
//                 <Select.Trigger>
//                   {roles.find((role) => role.role_id === postRole)?.name || "Select a role"}
//                 </Select.Trigger>
//                 <Select.Content>
//                   {roles.map((role) => (
//                     <Select.Item key={role.role_id} value={role.role_id}>
//                       {role.name}
//                     </Select.Item>
//                   ))}
//                 </Select.Content>
//               </Select.Root>
//             )}
//           </label>
          
//           {/* ฟิลด์ Project */}
//           <label>
//             <Text as="div" size="2" mb="1" weight="bold">
//               Project
//             </Text>
//             {loadingProjects ? (
//               <Text>Loading projects...</Text>
//             ) : (
//               <Select.Root
//                 size="2"
//                 value={postProject}
//                 onValueChange={(value) => setPostProject(value)}
//               >
//                 <Select.Trigger>
//                   {projects.find((project) => project.project_id === postProject)?.project_name || "Select a Project"}
//                 </Select.Trigger>
//                 <Select.Content>
//                   {projects.map((project) => (
//                     <Select.Item key={project.project_id} value={project.project_id}>
//                       {project.project_name}
//                     </Select.Item>
//                   ))}
//                 </Select.Content>
//               </Select.Root>
//             )}
//           </label>
//         </Flex>
//         <Flex gap="3" mt="4" justify="end">
//           <Dialog.Close>
//             <Button variant="soft" color="gray">
//               Cancel
//             </Button>
//           </Dialog.Close>
//           <Button onClick={handleCreateUser}>Save</Button>
//         </Flex>
//       </Dialog.Content>
//     </Dialog.Root>
//   );
// };

// export default DialogAdd;




  