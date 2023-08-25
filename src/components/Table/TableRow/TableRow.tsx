import { useMemo } from 'react'
import { TableRowProps } from './types'

const TableRow = ({ user }: TableRowProps) => {
  const emailClassnames = useMemo(() => {
    return `px-6 py-3 ${user.isEmailValid ? "" : "bg-yellow-500 text-white"}`;
  }, [user]);

  const phoneClassnames = useMemo(() => {
    return `px-6 py-3 ${user.isPhoneValid ? "" : "bg-yellow-500 text-white"}`;
  }, [user]);

  const userTitle = useMemo(() => {
    if (user.isNameDuplicate) {
      return `This name is duplicated multiple times`;
    }
  }, [user]);

  const emailTitle = useMemo(() => {
    if (!user.isEmailValid) {
      return "This email is not valid"
    }

    if (user.isEmailDuplicate) {
      return `This email is duplicated multiple times`;
    }
  }, [user]);

  const phoneTitle = useMemo(() => {
    if (!user.isPhoneValid) {
      return "This phone is not valid"
    }

    if (user.isPhoneDuplicate) {
      return `This phone is duplicated multiple times`;
    }
  }, [user]);

  const trStyles = useMemo(() => {
    return [user.isPhoneDuplicate, user.isEmailDuplicate, user.isNameDuplicate]
      .some((item) => item) ? "!bg-red-500 !text-white" : '';
  }, [user]);
      

  return (
    <tr className={`odd:bg-slate-100 ${trStyles}`}>
      <td className="px-6 py-3" title={userTitle}>{user.name}</td>
      <td className={emailClassnames} title={emailTitle}>{user.email || "Email is empty"}</td>
      <td className={phoneClassnames} title={phoneTitle}>{user.phone}</td>
    </tr>
  )
}

export default TableRow